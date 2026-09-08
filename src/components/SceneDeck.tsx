import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useSearchParams } from "react-router-dom";

gsap.registerPlugin(Observer, useGSAP);

export type Scene = {
  id: string;
  label: string;
  content: ReactNode;
  className?: string;
};

type SceneDeckProps = {
  scenes: Scene[];
  ariaLabel: string;
  loop?: boolean;
  hideControls?: boolean;
};

const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

const REVEAL = "h1, h2, h3, p, dl, blockquote, figcaption, small, strong, a, span";
// oversized display words and image veils are atmosphere, not copy
const REVEAL_SKIP = "[class*='backdrop'], [class*='ghost'], [class*='veil'], [aria-hidden='true']";

/**
 * The outermost text blocks in a scene, in document order. Nested matches are
 * dropped so a paragraph and the link inside it do not both animate.
 */
function revealTargets(scene: HTMLElement) {
  const picked: HTMLElement[] = [];
  for (const node of scene.querySelectorAll<HTMLElement>(REVEAL)) {
    if (node.closest(REVEAL_SKIP)) continue;
    if (!node.textContent?.trim()) continue;
    if (picked.some((chosen) => chosen.contains(node))) continue;
    picked.push(node);
  }
  return picked;
}

/**
 * Copy settles upward as a scene arrives. `y: "+=..."` keeps whatever transform
 * the layout already applies — several of these blocks are centred with
 * translate(-50%, -50%) — and clearProps hands styling back to the stylesheet.
 */
function revealCopy(scene: HTMLElement, delay: number) {
  const targets = revealTargets(scene);
  if (!targets.length) return null;
  return gsap.from(targets, {
    autoAlpha: 0,
    y: "+=26",
    duration: 0.9,
    delay,
    ease: "power3.out",
    stagger: { amount: 0.55 },
    clearProps: "transform,opacity,visibility",
  });
}

export function SceneDeck({ scenes, ariaLabel, loop = false, hideControls = false }: SceneDeckProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = Number.parseInt(searchParams.get("scene") ?? "0", 10);
  const initial = Number.isFinite(requested) ? clamp(requested, scenes.length - 1) : 0;
  const [active, setActive] = useState(initial);
  const previous = useRef<number | null>(null);
  const direction = useRef(1);
  const transitioning = useRef(false);
  const transitionTimer = useRef<number | null>(null);
  const deck = useRef<HTMLDivElement>(null);
  const reduceMotion = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const goTo = useCallback((next: number) => {
    if (transitioning.current || next === active) return;
    let target = next;
    if (loop) target = (next + scenes.length) % scenes.length;
    else target = clamp(next, scenes.length - 1);
    if (target === active) return;

    transitioning.current = true;
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => {
      transitioning.current = false;
      transitionTimer.current = null;
    }, reduceMotion ? 80 : 980);
    previous.current = active;
    direction.current = target > active ? 1 : -1;
    setActive(target);
    const nextParams = new URLSearchParams(searchParams);
    if (target === 0) nextParams.delete("scene");
    else nextParams.set("scene", String(target));
    setSearchParams(nextParams, { replace: true });
  }, [active, loop, reduceMotion, scenes.length, searchParams, setSearchParams]);

  useEffect(() => {
    const tone = scenes[active]?.className?.includes("scene--image") ? "image" : "light";
    document.documentElement.dataset.surface = tone;
    return () => {
      delete document.documentElement.dataset.surface;
    };
  }, [active, scenes]);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    const routeIndex = Number.parseInt(searchParams.get("scene") ?? "0", 10);
    const next = Number.isFinite(routeIndex) ? clamp(routeIndex, scenes.length - 1) : 0;
    if (next !== active && !transitioning.current) {
      previous.current = active;
      direction.current = next > active ? 1 : -1;
      setActive(next);
    }
  }, [active, scenes.length, searchParams]);

  useGSAP(() => {
    if (!deck.current) return;
    const nodes = Array.from(deck.current.querySelectorAll<HTMLElement>("[data-scene]"));
    const incoming = nodes[active];
    const outgoing = previous.current === null ? null : nodes[previous.current];
    if (!incoming) return;

    nodes.forEach((node, index) => {
      if (index !== active && index !== previous.current) {
        gsap.set(node, { autoAlpha: 0, pointerEvents: "none", scale: 1 });
      }
    });

    if (previous.current === null || reduceMotion) {
      if (outgoing) gsap.set(outgoing, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(incoming, { autoAlpha: 1, pointerEvents: "auto", yPercent: 0, scale: 1 });
      transitioning.current = false;
      previous.current = null;
      // first paint of the deck, so the copy reads in rather than appearing
      const intro = reduceMotion ? null : revealCopy(incoming, 0.18);
      return () => intro?.revert();
    }

    // sections travel a full viewport, so the deck reads as a page scrolling
    // rather than a stack of slides dissolving into each other
    const sign = direction.current;
    const timeline = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.92 },
      onComplete: () => {
        if (outgoing) gsap.set(outgoing, { autoAlpha: 0, pointerEvents: "none", yPercent: 0, scale: 1, zIndex: 0 });
        gsap.set(incoming, { zIndex: 0 });
        transitioning.current = false;
        if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
        transitionTimer.current = null;
        previous.current = null;
      },
    });
    gsap.set(incoming, { autoAlpha: 1, pointerEvents: "auto", yPercent: sign * 100, scale: 1, zIndex: 2 });
    if (outgoing) gsap.set(outgoing, { zIndex: 1 });
    // the outgoing section trails slightly, which keeps the eye on the arriving one
    if (outgoing) timeline.to(outgoing, { yPercent: sign * -38, ease: "power2.inOut" }, 0);
    timeline.to(incoming, { yPercent: 0 }, 0);
    // copy catches up once the section has most of the frame
    const copy = revealCopy(incoming, 0.42);

    return () => {
      timeline.kill();
      copy?.revert();
    };
  }, { scope: deck, dependencies: [active, reduceMotion] });

  useEffect(() => {
    if (!deck.current) return;
    const observer = Observer.create({
      target: deck.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 42,
      dragMinimum: 36,
      preventDefault: true,
      ignore: "a,button,input,textarea,select,option,label,form,[data-deck-ignore]",
      onUp: () => goTo(active + 1),
      onDown: () => goTo(active - 1),
    });
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input,textarea,select,button,a,[contenteditable='true']")) return;
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      }
      if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(scenes.length - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      observer.kill();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, goTo, scenes.length]);

  return (
    <div ref={deck} className="scene-deck" aria-label={ariaLabel}>
      <div className="scene-deck__stage">
        {scenes.map((scene, index) => (
          <section
            className={`scene ${scene.className ?? ""}`}
            data-scene
            data-active={index === active ? "true" : "false"}
            aria-hidden={index !== active}
            inert={index === active ? undefined : true}
            key={scene.id}
          >
            {scene.content}
          </section>
        ))}
      </div>

      {!hideControls && (
        <p className="scene-counter" data-deck-ignore aria-hidden="true">
          {String(active + 1).padStart(2, "0")}<span>/</span>{String(scenes.length).padStart(2, "0")}
        </p>
      )}

      <p className="visually-hidden" aria-live="polite">
        View {active + 1} of {scenes.length}: {scenes[active]?.label}
      </p>
    </div>
  );
}
