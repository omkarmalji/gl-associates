import { NavLink } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { projects, type ProjectType } from "../data";

export function ProjectsPage({ filter }: { filter?: ProjectType }) {
  const visible = filter ? projects.filter((project) => project.type === filter) : projects;

  return (
    <>
      <section className="projects-header page-pad">
        <div data-reveal>
          <p>Selected work</p>
          <h1>{filter ?? "Projects"}</h1>
        </div>
        <p data-reveal>Homes, interiors and cultural spaces shaped around place, resources and the lives within them.</p>
      </section>
      <nav className="project-filters page-pad" aria-label="Project filters">
        <NavLink end to="/projects">All <span>{projects.length}</span></NavLink>
        <NavLink to="/projects/architecture">Architecture <span>{projects.filter((project) => project.type === "Architecture").length}</span></NavLink>
        <NavLink to="/projects/interior">Interior <span>{projects.filter((project) => project.type === "Interior").length}</span></NavLink>
      </nav>
      <section className="projects-index page-pad" aria-live="polite">
        {visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
    </>
  );
}
