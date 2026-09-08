import { ArrowUpRight } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";
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

function ProjectsOpening({
  activeFilter,
  onFilter,
  visibleProjects,
}: {
  activeFilter: "All" | ProjectCategory;
  onFilter: (filter: "All" | ProjectCategory) => void;
  visibleProjects: Project[];
}) {
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
      <div className="project-browser" data-count={visibleProjects.length}>
        {visibleProjects.map((project) => (
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
