import { NavLink } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { projects, type ProjectType } from "../data";

export function ProjectsPage({ filter }: { filter?: ProjectType }) {
  const visible = filter ? projects.filter((project) => project.type === filter) : projects;
  return (
    <>
      <section className="inner-hero inner-hero--projects page-pad">
        <p data-reveal>{filter ?? "Selected work"}</p>
        <h1><span data-line-reveal>Projects built</span><br /><span data-line-reveal>from</span> <span data-line-reveal className="display-italic">belonging.</span></h1>
      </section>
      <nav className="project-filters page-pad" aria-label="Project filters">
        <NavLink end to="/projects">All</NavLink>
        <NavLink to="/projects/architecture">Architecture</NavLink>
        <NavLink to="/projects/interior">Interior</NavLink>
      </nav>
      <section className="projects-index page-pad">
        {visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
      </section>
    </>
  );
}
