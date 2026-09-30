import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const output = "asset-audit/captures";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

for (const [name, route, width, height] of [
  ["client-aundh-intro", "projects/aundh-museum?scene=0", 1440, 900],
  ["client-aundh-statement", "projects/aundh-museum?scene=1", 1440, 900],
  ["client-aundh-pair", "projects/aundh-museum?scene=3", 1440, 900],
  ["client-aundh-study", "projects/aundh-museum?scene=4", 1440, 900],
  ["client-studio-founders", "studio?scene=1", 1440, 900],
  ["client-studio-founders-mobile", "studio?scene=1", 390, 844],
  ["client-work-320", "projects", 320, 568],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:5173/gl-associates/#/${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${output}/${name}.png` });
  await page.close();
}

await browser.close();
