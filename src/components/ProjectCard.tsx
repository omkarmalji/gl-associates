import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { Project } from "../data";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const alternate = project.gallery[0];

  return (
    <article className={`work-card work-card--${(index % 6) + 1}`} data-reveal>
      <Link to={`/projects/${project.slug}`}>
        <div className="work-card__image" data-image-reveal>
          <img className="work-card__primary" src={project.cover} alt={`${project.title}, ${project.location}`} loading="lazy" />
          {alternate && <img className="work-card__alternate" src={alternate} alt="" loading="lazy" />}
          <span className="work-card__arrow" aria-hidden="true"><ArrowUpRight size={18} weight="light" /></span>
        </div>
        <div className="work-card__meta">
          <h2>{project.title}</h2>
          <p>{project.location}</p>
          <p>{project.type}, {project.year}</p>
        </div>
      </Link>
    </article>
  );
}
