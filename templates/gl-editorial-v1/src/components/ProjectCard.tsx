import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { Project } from "../data";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <article className={`work-card work-card--${(index % 4) + 1}`} data-reveal>
      <Link to={`/projects/${project.slug}`}>
        <div className="work-card__image" data-parallax>
          <img src={project.cover} alt={`${project.title}, ${project.location}`} loading="lazy" />
          <span className="work-card__arrow"><ArrowUpRight size={18} /></span>
        </div>
        <div className="work-card__meta">
          <h2>{project.title}</h2>
          <p>{project.type}<br />{project.location}, {project.year}</p>
        </div>
      </Link>
    </article>
  );
}
