import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) return <NotFoundPage />;
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="project-hero">
        <img src={project.cover} alt={`${project.title} by Gayatri Lokesh Architects`} fetchPriority="high" />
        <div className="project-hero__scrim" />
        <Link className="project-back" to="/projects"><ArrowLeft size={17} weight="light" /> Projects</Link>
        <div className="project-hero__title">
          <p>{project.type}</p>
          <h1>{project.title}</h1>
        </div>
        <p className="project-hero__meta">{project.location}<br />{project.year}</p>
      </section>

      <section className="project-intro page-pad">
        <p className="project-intro__label" data-reveal>Design intent</p>
        <p className="project-intro__summary" data-reveal>{project.summary}</p>
        <dl data-reveal>
          <div><dt>Discipline</dt><dd>{project.type}</dd></div>
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Completed</dt><dd>{project.year}</dd></div>
        </dl>
      </section>

      <section className="project-gallery page-pad">
        {project.gallery.map((image, imageIndex) => (
          <figure key={image} className={`project-gallery__item project-gallery__item--${(imageIndex % 5) + 1}`} data-reveal data-image-reveal>
            <img src={image} alt={`${project.title} project view ${imageIndex + 1}`} loading="lazy" />
          </figure>
        ))}
      </section>

      <section className="project-enquiry page-pad" data-reveal>
        <p>Considering a project with similar questions?</p>
        <Link to="/contact">Contact <ArrowUpRight size={18} weight="light" /></Link>
      </section>

      <nav className="project-pagination" aria-label="Project navigation">
        <Link to={`/projects/${previous.slug}`}><ArrowLeft size={20} weight="light" /><span>Previous</span><strong>{previous.title}</strong></Link>
        <Link to={`/projects/${next.slug}`}><span>Next</span><strong>{next.title}</strong><ArrowRight size={20} weight="light" /></Link>
      </nav>
    </>
  );
}
