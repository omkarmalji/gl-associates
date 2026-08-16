import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) return <NotFoundPage />;
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="project-hero">
        <img src={project.cover} alt={`${project.title} by Gayatri Lokesh Architects`} fetchPriority="high" style={{ objectPosition: project.heroPosition ?? "center" }} />
        <div className="project-hero__scrim" />
        <Link className="project-back" to="/projects"><ArrowLeft size={17} /> All projects</Link>
        <h1>{project.title}</h1>
        <p>{project.type}<br />{project.location}, {project.year}</p>
      </section>
      <section className="project-intro page-pad">
        <h2 data-reveal>{project.title}</h2>
        <p data-reveal>{project.summary}</p>
        <dl data-reveal><div><dt>Type</dt><dd>{project.type}</dd></div><div><dt>Place</dt><dd>{project.location}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div></dl>
      </section>
      <section className="project-gallery page-pad">
        {project.gallery.map((image, imageIndex) => (
          <figure key={image} className={`project-gallery__item project-gallery__item--${(imageIndex % 4) + 1}`} data-reveal data-parallax>
            <img src={image} alt={`${project.title} project view ${imageIndex + 1}`} loading="lazy" />
          </figure>
        ))}
      </section>
      <Link className="next-project" to={`/projects/${next.slug}`}>
        <span>Next project</span><strong>{next.title}</strong><ArrowRight size={28} />
      </Link>
    </>
  );
}
