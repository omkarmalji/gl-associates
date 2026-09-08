import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useSearchParams } from "react-router-dom";
import { HoverExpand_001 } from "../components/ui/skiper-ui/skiper52";
import { HoverExpand_002 } from "../components/ui/skiper-ui/skiper53";
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

type BrowserLayout =
  | { mode: "row"; collapsed: string; expanded: string; height: string }
  | { mode: "stack"; collapsed: string; expanded: string; width: string }
  | { mode: "grid" };

const GAP = 4;

/**
 * The horizontal row needs a pointer and room for an open panel beside the
 * collapsed ones; elsewhere the panels stack and expand downward. Either way the
 * panels are measured against the container so the set always fits one screen.
 * If it cannot, the plain grid takes over.
 */
function useBrowserLayout(container: React.RefObject<HTMLDivElement | null>, count: number) {
  const [layout, setLayout] = useState<BrowserLayout>({ mode: "grid" });

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const measure = () => {
      if (count < 2) {
        setLayout({ mode: "grid" });
        return;
      }
      const { clientWidth: width, clientHeight: height } = element;
      const gaps = (count - 1) * GAP;
      const fine = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)").matches;

      if (fine) {
        // the shipped panel is 24rem; give it that when there is room, else 42% of the row
        const expanded = Math.min(384, Math.max(240, width * 0.42));
        const collapsed = (width - expanded - gaps) / (count - 1);
        if (collapsed >= 26) {
          setLayout({
            mode: "row",
            collapsed: `${collapsed}px`,
            expanded: `${expanded}px`,
            height: `${Math.min(430, Math.max(240, height))}px`,
          });
          return;
        }
      }

      const expanded = Math.min(300, Math.max(190, height * 0.44));
      const collapsed = (height - expanded - gaps) / (count - 1);
      if (collapsed >= 18) {
        setLayout({
          mode: "stack",
          collapsed: `${collapsed}px`,
          expanded: `${expanded}px`,
          width: `${width}px`,
        });
        return;
      }

      setLayout({ mode: "grid" });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [container, count]);

  return layout;
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
  const layout = useBrowserLayout(browser, visibleProjects.length);
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
      <div className="project-browser" data-count={visibleProjects.length} data-mode={layout.mode} ref={browser}>
        {layout.mode === "row" && (
          <HoverExpand_001
            className="project-browser__row"
            collapsedWidth={layout.collapsed}
            expandedWidth={layout.expanded}
            panelHeight={layout.height}
            images={panels}
          />
        )}
        {layout.mode === "stack" && (
          <HoverExpand_002
            className="project-browser__row"
            collapsedHeight={layout.collapsed}
            expandedHeight={layout.expanded}
            panelWidth={layout.width}
            gap={`${GAP}px`}
            images={panels}
          />
        )}
        {layout.mode === "grid" && visibleProjects.map((project) => (
          <Link to={`/projects/${project.slug}`} key={project.slug} aria-label={`View ${project.title}`}>
            <ResponsiveImage image={project.images[0]} />
            <span><strong>{project.shortTitle}</strong><small>{project.category}</small></span>
          </Link>
        ))}
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
