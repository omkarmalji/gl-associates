import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const base = "http://127.0.0.1:5173/gl-associates/";
const output = path.join(process.cwd(), "asset-audit", "captures");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--disable-gpu"],
});

const report = [];
const errors = [];

async function audit(name, hash, viewport, wait = 900) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${name}: console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${name}: pageerror: ${error.message}`));
  await page.goto(`${base}${hash}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
  const metrics = await page.evaluate(() => {
    const hiddenOverflowClasses = ["typology-scene__backdrop", "project-composition__ghost", "material-scene__backdrop"];
    const textOutliers = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const html = element;
        const style = getComputedStyle(html);
        const rect = html.getBoundingClientRect();
        const ownText = Array.from(html.childNodes).some((node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
        return ownText
          && style.visibility !== "hidden"
          && style.display !== "none"
          && !hiddenOverflowClasses.some((className) => html.classList.contains(className))
          && (rect.left < -2 || rect.right > window.innerWidth + 2);
      })
      .map((element) => ({ tag: element.tagName, className: element.className, text: element.textContent?.trim().slice(0, 80), rect: element.getBoundingClientRect().toJSON() }));
    const brokenImages = Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src);
    const activeScene = document.querySelector("[data-scene][data-active='true']");
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      activeSceneClass: activeScene?.className ?? null,
      textOutliers,
      brokenImages,
    };
  });
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: false });
  report.push({ name, hash, viewport, url: page.url(), ...metrics });
  return page;
}

let page = await audit("desktop-home-00", "#/", { width: 1440, height: 900 }, 4200);
await page.mouse.wheel(0, 720);
await page.waitForTimeout(1100);
await page.screenshot({ path: path.join(output, "desktop-home-wheel.png") });
report.push({ name: "desktop-home-wheel", url: page.url() });
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(1100);
report.push({ name: "desktop-home-key", url: page.url() });
await page.close();

for (const [name, hash] of [
  ["desktop-projects", "#/projects"],
  ["desktop-project", "#/projects/preschool-latur"],
  ["desktop-studio", "#/studio"],
  ["desktop-process", "#/process?scene=1"],
  ["desktop-contact", "#/contact?scene=1"],
]) {
  page = await audit(name, hash, { width: 1440, height: 900 });
  await page.close();
}

for (const [name, hash] of [
  ["mobile-home", "#/"],
  ["mobile-home-typology", "#/?scene=9"],
  ["mobile-projects", "#/projects"],
  ["mobile-project", "#/projects/preschool-latur"],
  ["mobile-studio", "#/studio"],
  ["mobile-process", "#/process?scene=1"],
  ["mobile-contact", "#/contact?scene=1"],
]) {
  page = await audit(name, hash, { width: 390, height: 844 }, name.startsWith("mobile-home") ? 4200 : 900);
  if (name === "mobile-home") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(output, "mobile-menu.png") });
  }
  await page.close();
}

page = await audit("mobile-short-contact", "#/contact?scene=1", { width: 320, height: 568 });
await page.close();

await browser.close();
const geometryFailures = report.filter((entry) => entry.innerWidth && (
  entry.scrollWidth !== entry.innerWidth
  || entry.scrollHeight !== entry.innerHeight
  || entry.textOutliers.length
  || entry.brokenImages.length
));
const interactionFailures = report.filter((entry) => (
  entry.name === "desktop-home-wheel" && !entry.url.endsWith("?scene=1")
) || (
  entry.name === "desktop-home-key" && !entry.url.endsWith("?scene=2")
));
const result = { report, errors, geometryFailures, interactionFailures };
console.log(JSON.stringify(result, null, 2));
if (errors.length || geometryFailures.length || interactionFailures.length) process.exitCode = 1;
