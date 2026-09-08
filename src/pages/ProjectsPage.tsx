import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";
import { HoverExpand_001 } from "../components/ui/skiper-ui/skiper52";
import { PageLink as Link } from "../components/PageLink";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { projects, type Project, type ProjectCategory } from "../data";

const filters: Array<"All" | ProjectCategory> = ["All", "Residential", "Institutional", "Culture", "Interior"];

export function ProjectsPage({ filter }: { filter?: "Architecture" | "Interior" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const legacyFilter = filter === "Interior" ? "Interior" : filter === "Architecture" ? "Residential" : undefined;
  const requestedFilter = searchParams.get("type") as ProjectCategory | null;
  const activeFilter: "All" | ProjectCategory = requestedFilter && filters.includes(requestedFilter) ? requestedFilter : legacyFilter ?? "All";
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  const setFilter = (next: "All" | ProjectCategory) => {
    const params = new URLSearchParams(searchParams);
    params.delete("scene");
    if (next === "All") params.delete("type");
    else params.set("type", next);
    setSearchParams(params);
  };

  const scenes: Scene[] = [
    {
      id: `index-${activeFilter}`,
      label: activeFilter === "All" ? "Selected projects" : activeFilter,
      className: "scene--charcoal",
      content: <ProjectsOpening activeFilter={activeFilter} onFilter={setFilter} visibleProjects={visibleProjects} />,
    },
    ...visibleProjects.map((project, index): Scene => ({
      id: project.slug,
      label: project.shortTitle,
      className: "scene--image",
      content: <ProjectIndexVisual project={project} index={index} />,
    })),
  ];

  return <SceneDeck key={activeFilter} scenes={scenes} ariaLabel="Project index" />;
}

const GAP = 4;

type Filmstrip = {
  collapsed: string;
  expanded: string;
  height: string;
  gap: string;
  overflows: boolean;
  scrollsWithWheel: boolean;
  followActive: boolean;
};

/**
 * Panels keep a constant size whatever the project count: dividing the frame
 * between them made a collapsed panel wider than an open one as soon as a filter
 * left only two or three, and crowded them to slivers on "All". When the set is
 * wider than the frame the strip scrolls instead of shrinking, so adding
 * projects lengthens the strip rather than thinning every panel.
 */
function useFilmstrip(container: React.RefObject<HTMLDivElement | null>, count: number) {
  const [strip, setStrip] = useState<Filmstrip | null>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const measure = () => {
      const { clientWidth: width, clientHeight: height } = element;
      if (!width || !height) return;
      const fine = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)").matches;

      const collapsed = fine ? 92 : 68;
      const rest = collapsed * (count - 1) + GAP * (count - 1);
      const preferred = fine ? 384 : Math.min(300, Math.max(210, width * 0.74));
      const floor = fine ? 280 : 190;

      // a set that very nearly fits gives the open panel back a little width so it
      // sits inside the frame; one that cannot fit keeps its size and scrolls
      const room = width - rest;
      const expanded = preferred + rest > width && room >= floor ? room : preferred;
      const overflows = expanded + rest > width;

      setStrip({
        collapsed: `${collapsed}px`,
        expanded: `${Math.floor(expanded)}px`,
        height: `${Math.min(fine ? 430 : 470, Math.max(220, height))}px`,
        gap: `${GAP}px`,
        overflows,
        // a pointer scrolls the strip with the wheel; touch keeps vertical swipes
        // for the deck and reaches panels by tapping them into view
        scrollsWithWheel: overflows && fine,
        followActive: !fine,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [container, count]);

  return strip;
}

function ProjectsOpening({
  activeFilter,
  onFilter,
  visibleProjects,
}: {
  activeFilter: "All" | ProjectCategory;
  onFilter: (filter: "All" | ProjectCategory) => void;
  visibleProjects: Project[];
}) {
  const browser = useRef<HTMLDivElement>(null);
  const strip = useFilmstrip(browser, visibleProjects.length);
  const panels = visibleProjects.map((project) => ({
    src: project.images[0].src,
    alt: project.images[0].alt,
    label: project.shortTitle,
    code: project.category,
    href: `/projects/${project.slug}`,
  }));

  return (
    <article className="projects-opening">
      <div className="projects-opening__header">
        <h1>Work</h1>
        <p>Architecture shaped by true stories, working landscapes and lived experience.</p>
      </div>
      <div className="project-filters" data-deck-ignore>
        {filters.map((item) => (
          <button className={item === activeFilter ? "is-active" : ""} type="button" onClick={() => onFilter(item)} aria-pressed={item === activeFilter} key={item}>
            {item}
          </button>
        ))}
      </div>
      <div
        className="project-browser"
        data-count={visibleProjects.length}
        data-overflows={strip?.overflows ? "true" : "false"}
        data-deck-ignore={strip?.scrollsWithWheel ? "" : undefined}
        ref={browser}
      >
        {strip && (
          <HoverExpand_001
            className="project-browser__row"
            collapsedWidth={strip.collapsed}
            expandedWidth={strip.expanded}
            panelHeight={strip.height}
            gap={strip.gap}
            followActive={strip.followActive}
            images={panels}
          />
        )}
      </div>
    </article>
  );
}
function ProjectIndexVisual({ project, index }: { project: Project; index: number }) {
  const secondary = project.images[Math.min(2, project.images.length - 1)];
  return (
    <article className={`project-index-visual project-index-visual--${index % 3}`}>
      <div className="project-index-visual__media">
        <ResponsiveImage image={project.images[0]} eager={index === 0} />
      </div>
      <div className="project-index-visual__secondary"><ResponsiveImage image={secondary} /></div>
      <div className={`project-index-visual__slab project-index-visual__slab--${project.ink}`} style={{ background: project.accent }}>
        <span>{project.category}</span>
        <h1>{project.shortTitle}</h1>
        <dl>
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          {project.area && <div><dt>Area</dt><dd>{project.area}</dd></div>}
        </dl>
        <Link to={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}><ArrowUpRight weight="light" /></Link>
      </div>
    </article>
  );
}
