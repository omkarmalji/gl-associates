/**
 * Overlap audit: walks every route/scene at desktop + mobile viewports and reports
 * pairs of visible, non-nested elements whose boxes intersect.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const base = process.env.QA_BASE ?? "http://127.0.0.1:5173/gl-associates/";
const output = path.join(process.cwd(), "asset-audit", "overlap");
await mkdir(output, { recursive: true });

const routes = [
  ["home", "#/", 12],
  ["projects", "#/projects", 12],
  ["project-detail", "#/projects/preschool-latur", 6],
  ["studio", "#/studio", 5],
  ["process", "#/process", 5],
  ["contact", "#/contact", 2],
];

const viewports = [
  ["desktop", { width: 1440, height: 900 }],
  ["laptop", { width: 1280, height: 720 }],
  ["tablet", { width: 834, height: 1112 }],
  ["mobile", { width: 390, height: 844 }],
  ["mobile-small", { width: 320, height: 568 }],
];

const collect = () => {
  const IGNORE_CLASS = [
    "typology-scene__backdrop",
    "project-composition__ghost",
    "material-scene__backdrop",
    "scene-deck__stage",
    "project-hero__veil",
    "skip-link",
    "visually-hidden",
  ];
  // oversized display words that bleed off the frame on purpose
  const IGNORE_SELECTOR = ".project-pair > p, .project-study > p";
  const isDecorative = (el, style) =>
    style.pointerEvents === "none"
    || Number.parseFloat(style.opacity) < 0.15
    || IGNORE_CLASS.some((c) => el.classList.contains(c))
    || el.matches(IGNORE_SELECTOR);

  const candidates = [];
  const activeScene = document.querySelector("[data-scene][data-active='true']");
  const roots = [activeScene, document.querySelector(".site-nav"), document.querySelector(".scene-counter")].filter(Boolean);

  for (const root of roots) {
    const nodes = [root, ...root.querySelectorAll("*")];
    for (const el of nodes) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (isDecorative(el, style)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;
      const interactive = el.matches("a,button,input,textarea,select");
      const ownText = Array.from(el.childNodes)
        .some((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      const rectArea = rect.width * rect.height;
      const viewportArea = window.innerWidth * window.innerHeight;
      // full-bleed art direction sits behind everything by design
      const isBackdrop = el.tagName === "IMG" && rectArea / viewportArea > 0.32;
      if (isBackdrop) continue;
      const isImage = el.tagName === "IMG";
      if (!interactive && !ownText && !isImage) continue;
      candidates.push({
        el,
        interactive,
        isImage,
        tag: el.tagName,
        className: typeof el.className === "string" ? el.className : "",
        text: (el.textContent ?? "").trim().slice(0, 48),
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height, right: rect.right, bottom: rect.bottom },
      });
    }
  }

  const overlaps = [];
  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = i + 1; j < candidates.length; j += 1) {
      const a = candidates[i];
      const b = candidates[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      // full-bleed imagery sits behind content by design: only compare image-to-image
      if (a.isImage !== b.isImage) continue;
      if (!a.interactive && !b.interactive && !a.isImage) continue;
      const ox = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.x, b.rect.x);
      const oy = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.y, b.rect.y);
      // staggered image compositions kiss by a few pixels by design
      const slack = a.isImage && b.isImage ? 24 : 2;
      if (ox <= slack || oy <= slack) continue;
      overlaps.push({
        a: { tag: a.tag, className: a.className, text: a.text, rect: a.rect },
        b: { tag: b.tag, className: b.className, text: b.text, rect: b.rect },
        overlap: { w: Math.round(ox), h: Math.round(oy) },
      });
    }
  }

  const offscreen = candidates
    .filter((c) => c.rect.x < -2 || c.rect.right > window.innerWidth + 2 || c.rect.bottom > window.innerHeight + 2 || c.rect.y < -2)
    .map((c) => ({ tag: c.tag, className: c.className, text: c.text, rect: c.rect }));

  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    overlaps,
    offscreen,
  };
};

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--disable-gpu"],
});

const findings = [];
const consoleErrors = [];

for (const [vpName, viewport] of viewports) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(`${vpName}: ${m.text()}`); });
  page.on("pageerror", (e) => consoleErrors.push(`${vpName}: pageerror: ${e.message}`));
  for (const [routeName, hash, sceneCount] of routes) {
    for (let scene = 0; scene < sceneCount; scene += 1) {
      const url = `${base}${hash}${scene === 0 ? "" : (hash.includes("?") ? "&" : "?") + `scene=${scene}`}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(2200);
      const result = await page.evaluate(collect);
      const id = `${vpName}-${routeName}-${scene}`;
      if (result.overlaps.length || result.offscreen.length || result.scrollWidth !== result.innerWidth) {
        findings.push({ id, url, ...result });
        await page.screenshot({ path: path.join(output, `${id}.png`) });
      }
    }
  }
  await page.close();
}

await browser.close();
await writeFile(path.join(output, "report.json"), JSON.stringify({ findings, consoleErrors }, null, 2));

const summary = findings.map((f) => ({
  id: f.id,
  overlaps: f.overlaps.map((o) => `${o.a.tag}.${o.a.className}|${o.a.text} X ${o.b.tag}.${o.b.className}|${o.b.text} (${o.overlap.w}x${o.overlap.h})`),
  offscreen: f.offscreen.map((o) => `${o.tag}.${o.className}|${o.text} @ ${Math.round(o.rect.x)},${Math.round(o.rect.y)} ${Math.round(o.rect.w)}x${Math.round(o.rect.h)}`),
  hScroll: f.scrollWidth !== f.innerWidth ? `${f.scrollWidth} vs ${f.innerWidth}` : undefined,
}));
console.log(JSON.stringify({ summary, consoleErrors }, null, 2));
if (findings.length || consoleErrors.length) process.exitCode = 1;
