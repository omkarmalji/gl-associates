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

async function audit(name, hash, viewport, wait = 900, theme = "light") {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.addInitScript((selectedTheme) => {
    window.localStorage.setItem("gl-theme", selectedTheme);
  }, theme);
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
    const visibilitySurfaces = Array.from(document.querySelectorAll(".site-nav, .brand, .desktop-nav, .theme-toggle, .scene-controls, .project-hero--high-key h1 span"))
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      })
      .map((element) => ({
        role: element.matches(".site-nav") ? "mobile header"
          : element.matches(".brand") ? "brand"
            : element.matches(".desktop-nav") ? "desktop navigation"
              : element.matches(".theme-toggle") ? "theme toggle"
                : element.matches(".scene-controls") ? "scene navigation"
                  : "high-key title",
        className: element.className,
        background: getComputedStyle(element).backgroundColor,
        color: getComputedStyle(element).color,
      }));
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      theme: document.documentElement.dataset.theme,
      activeSceneClass: activeScene?.className ?? null,
      textOutliers,
      brokenImages,
      visibilitySurfaces,
    };
  });
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage: false });
  report.push({ name, hash, viewport, requestedTheme: theme, url: page.url(), ...metrics });
  return page;
}

let page = await audit("desktop-home-00", "#/", { width: 1440, height: 900 }, 3200, "light");
await page.mouse.wheel(0, 720);
await page.waitForTimeout(1100);
await page.screenshot({ path: path.join(output, "desktop-home-wheel.png") });
report.push({ name: "desktop-home-wheel", url: page.url() });
await page.keyboard.press("ArrowDown");
await page.waitForTimeout(1100);
report.push({ name: "desktop-home-key", url: page.url() });
await page.close();

for (const [name, hash, theme = "light", wait = 900] of [
  ["desktop-home-dark", "#/", "dark", 3200],
  ["desktop-brick-light", "#/?scene=6", "light", 3200],
  ["desktop-brick-dark", "#/?scene=6", "dark", 3200],
  ["desktop-typology", "#/?scene=9", "light", 3200],
  ["desktop-typology-dark", "#/?scene=9", "dark", 3200],
  ["desktop-projects", "#/projects"],
  ["desktop-projects-dark", "#/projects", "dark"],
  ["desktop-project", "#/projects/preschool-latur"],
  ["desktop-studio", "#/studio"],
  ["desktop-studio-dark", "#/studio", "dark"],
  ["desktop-studio-end", "#/studio?scene=4"],
  ["desktop-studio-end-dark", "#/studio?scene=4", "dark"],
  ["desktop-process", "#/process?scene=1"],
  ["desktop-contact", "#/contact?scene=1"],
  ["desktop-contact-dark", "#/contact?scene=1", "dark"],
]) {
  page = await audit(name, hash, { width: 1440, height: 900 }, wait, theme);
  await page.close();
}

for (const [name, hash, theme = "light"] of [
  ["mobile-home", "#/"],
  ["mobile-home-dark", "#/", "dark"],
  ["mobile-home-typology", "#/?scene=9"],
  ["mobile-projects", "#/projects"],
  ["mobile-projects-dark", "#/projects", "dark"],
  ["mobile-project", "#/projects/preschool-latur"],
  ["mobile-studio", "#/studio"],
  ["mobile-studio-dark", "#/studio", "dark"],
  ["mobile-studio-end", "#/studio?scene=4"],
  ["mobile-studio-end-dark", "#/studio?scene=4", "dark"],
  ["mobile-process", "#/process?scene=1"],
  ["mobile-contact", "#/contact?scene=1"],
  ["mobile-contact-dark", "#/contact?scene=1", "dark"],
]) {
  page = await audit(name, hash, { width: 390, height: 844 }, name.startsWith("mobile-home") ? 3200 : 900, theme);
  if (name === "mobile-home") {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(output, "mobile-menu.png") });
  }
  await page.close();
}

page = await audit("mobile-short-projects", "#/projects", { width: 320, height: 568 });
await page.close();
page = await audit("mobile-short-contact", "#/contact?scene=1", { width: 320, height: 568 });
await page.close();

page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await page.goto(`${base}#/studio`, { waitUntil: "networkidle" });
const themeBeforeToggle = await page.evaluate(() => document.documentElement.dataset.theme);
const expectedPersistedTheme = themeBeforeToggle === "dark" ? "light" : "dark";
await page.locator(".theme-toggle").first().click();
await page.waitForFunction((expected) => document.documentElement.dataset.theme === expected, expectedPersistedTheme);
await page.reload({ waitUntil: "networkidle" });
const persistedTheme = await page.evaluate(() => ({
  dataset: document.documentElement.dataset.theme,
  stored: window.localStorage.getItem("gl-theme"),
}));
report.push({ name: "theme-persistence-result", expectedPersistedTheme, persistedTheme });
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
const themeFailures = report.filter((entry) => (
  entry.requestedTheme && entry.theme !== entry.requestedTheme
) || (
  entry.name === "theme-persistence-result"
  && (entry.persistedTheme.dataset !== entry.expectedPersistedTheme || entry.persistedTheme.stored !== entry.expectedPersistedTheme)
));
const alpha = (color) => color.startsWith("rgba") ? Number.parseFloat(color.match(/,\s*([\d.]+)\)$/)?.[1] ?? "0") : 1;
const visibilityFailures = report.flatMap((entry) => (entry.visibilitySurfaces ?? [])
  .filter((surface) => {
    const mobile = entry.viewport?.width <= 760;
    const required = surface.role === "scene navigation"
      || surface.role === "high-key title"
      || (mobile && surface.role === "mobile header")
      || (!mobile && ["brand", "desktop navigation", "theme toggle"].includes(surface.role));
    return required && alpha(surface.background) < 0.75;
  })
  .map((surface) => ({ name: entry.name, viewport: entry.viewport, ...surface })));
const result = { report, errors, geometryFailures, interactionFailures, themeFailures, visibilityFailures };
console.log(JSON.stringify(result, null, 2));
if (errors.length || geometryFailures.length || interactionFailures.length || themeFailures.length || visibilityFailures.length) process.exitCode = 1;
