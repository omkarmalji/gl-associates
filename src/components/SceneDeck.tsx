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
    const tone = scenes[active]?.className?.includes("scene--paper") ? "light" : "image";
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
      return;
    }

    const sign = direction.current;
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        if (outgoing) gsap.set(outgoing, { autoAlpha: 0, pointerEvents: "none", yPercent: 0, scale: 1 });
        transitioning.current = false;
        if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
        transitionTimer.current = null;
        previous.current = null;
      },
    });
    gsap.set(incoming, { autoAlpha: 0, pointerEvents: "auto", yPercent: sign * 7, scale: 1.035 });
    if (outgoing) timeline.to(outgoing, { autoAlpha: 0, yPercent: sign * -5, scale: 0.975, duration: 0.72 }, 0);
    timeline.to(incoming, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.9 }, 0.08);

    return () => timeline.kill();
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
        <div className="scene-controls" data-deck-ignore>
          <span className="scene-controls__count" aria-live="polite">View {active + 1} of {scenes.length}</span>
          <span className="scene-controls__label">{scenes[active]?.label}</span>
        </div>
      )}
    </div>
  );
}
