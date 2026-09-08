import { chromium } from "playwright-core";

const base = "http://127.0.0.1:5173/gl-associates/";
const projectSlugs = [
  "preschool-latur",
  "jj-archival-art-museum",
  "aundh-art-museum-extension",
  "pocra-museum",
  "aundha-nagnath-temple-precinct",
  "brick-abode",
  "wabi-sabi-house",
  "goldcrest-interactive-spaces",
  "prabhadevi-home",
  "congress-bhavan-workplace",
  "vilas-bank",
];
const routes = [
  "#/",
  "#/projects",
  ...projectSlugs.map((slug) => `#/projects/${slug}`),
  "#/studio",
  "#/process",
  "#/contact",
  "#/privacy",
  "#/terms",
  "#/missing-page",
];
const errors = [];
const failures = [];

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--disable-gpu"],
});

async function inspect(page, label) {
  await page.waitForTimeout(250);
  const result = await page.evaluate(() => {
    const active = document.querySelector("[data-scene][data-active='true']");
    const visibleImages = Array.from(active?.querySelectorAll("img") ?? []);
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      mainText: document.querySelector("main")?.textContent?.trim().slice(0, 80) ?? "",
      activeScene: active?.className ?? null,
      brokenVisibleImages: visibleImages.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
    };
  });
  if (
    result.width !== result.scrollWidth
    || result.height !== result.scrollHeight
    || !result.mainText
    || result.brokenVisibleImages.length
  ) failures.push({ label, ...result });
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${viewport.width}:${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${viewport.width}:${error.message}`));
  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    await inspect(page, `${viewport.width}:${route}`);
  }
  await page.close();
}

const deckChecks = [
  ["#/", 11, 3500],
  ["#/projects", 12, 0],
  ["#/projects/brick-abode", 6, 0],
  ["#/studio", 5, 0],
  ["#/process", 4, 0],
  ["#/contact", 2, 0],
];

for (const [route, expectedScenes, initialWait] of deckChecks) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  if (initialWait) await page.waitForTimeout(initialWait);
  const actualScenes = await page.locator("[data-scene]").count();
  if (actualScenes !== expectedScenes) failures.push({ route, expectedScenes, actualScenes });
  for (let index = 1; index < actualScenes; index += 1) {
    await page.getByRole("button", { name: "Next view" }).click();
    await page.waitForTimeout(1050);
    await inspect(page, `${route}?scene=${index}`);
    if (!page.url().endsWith(`?scene=${index}`)) failures.push({ route, index, url: page.url() });
  }
  await page.close();
}

await browser.close();
console.log(JSON.stringify({ checkedRoutes: routes.length * 2, deckChecks: deckChecks.length, errors, failures }, null, 2));
if (errors.length || failures.length) process.exitCode = 1;
