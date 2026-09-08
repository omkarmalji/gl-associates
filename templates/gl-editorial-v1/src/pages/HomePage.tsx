import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { practiceCopy, projects } from "../data";

const studies = [
  { title: "Learning from the site", type: "Site study", image: "images/spirit-site.jpg" },
  { title: "Plans as conversations", type: "Drawing", image: "images/original/tidy-04.jpg" },
  { title: "Local systems", type: "Material research", image: "images/liberation-structure.jpg" },
];

export function HomePage() {
  const heroProjects = [projects[1], projects[0], projects[2]];
  const [heroIndex, setHeroIndex] = useState(0);
  const heroProject = heroProjects[heroIndex];

  const changeHero = (direction: number) => {
    setHeroIndex((current) => (current + direction + heroProjects.length) % heroProjects.length);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => changeHero(1), 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero home-hero" aria-roledescription="carousel" aria-label="Featured projects">
        {heroProjects.map((project, index) => (
          <img
            key={project.slug}
            className={`hero__image ${index === heroIndex ? "is-active" : ""}`}
            src={project.cover}
            alt={index === heroIndex ? `${project.title} project by Gayatri Lokesh Architects` : ""}
            aria-hidden={index !== heroIndex}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}
        <div className="hero__wash" />
        <Link className="hero__project-link" to={`/projects/${heroProject.slug}`} aria-label={`View ${heroProject.title}`}>
          <h1 key={heroProject.slug} className="hero__title" aria-live="polite">{heroProject.title}</h1>
        </Link>
        <div className="hero__footer page-pad">
          <div className="hero__project-meta">
            <span>Project</span>
            <p>{heroProject.title}<br />{heroProject.location}, {heroProject.year}</p>
          </div>
          <div className="hero__description">
            <span>Description</span>
            <p>{heroProject.summary}</p>
          </div>
          <div className="hero__navigation">
            <span>{String(heroIndex + 1).padStart(2, "0")} / {String(heroProjects.length).padStart(2, "0")}</span>
            <div className="hero__controls" aria-label="Featured project controls">
              <button type="button" onClick={() => changeHero(-1)} aria-label="Previous project"><ArrowLeft size={18} weight="light" /></button>
              <button type="button" onClick={() => changeHero(1)} aria-label="Next project"><ArrowRight size={18} weight="light" /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="statement page-pad">
        <div className="statement__brand" data-reveal>
          <img src="images/gl-associates-logo-transparent.png" alt="" />
          <span>Gayatri Lokesh Architects LLP</span>
        </div>
        <p data-reveal>
          A Mumbai and Pune based practice shaped by curiosity, context and belonging. <span>We learn, unlearn and relearn to create architecture with economy, sensibility and visual intelligence.</span>
        </p>
      </section>

      <section className="home-work page-pad">
        <div className="home-work__backdrop" aria-hidden="true">Our Projects</div>
        <div className="section-heading" data-reveal>
          <h2>Selected work</h2>
          <Link to="/projects">View projects <ArrowUpRight size={16} weight="light" /></Link>
        </div>
        <div className="home-work__grid">
          {projects.slice(0, 5).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>

      <section className="practice page-pad">
        <div className="practice__intro" data-reveal>
          <h2>Architecture in service of everyday life.</h2>
          <p>{practiceCopy.philosophy}</p>
        </div>
        <div className="services-stage">
          <Link to="/projects/architecture" className="service-line">
            <span>Architecture</span>
            <figure><img src="images/spirit-front.jpg" alt="Spirit of the Place exterior" loading="lazy" /></figure>
            <i><ArrowUpRight size={19} weight="light" /></i>
          </Link>
          <Link to="/projects/interior" className="service-line service-line--interior" aria-label="Explore interior projects">
            <span className="service-line__marquee" aria-hidden="true"><b>Interior / Interior / Interior / Interior /</b><b>Interior / Interior / Interior / Interior /</b></span>
            <figure><img src="images/dolittle-wide.jpg" alt="Do Little Space interior" loading="lazy" /></figure>
            <i><ArrowUpRight size={19} weight="light" /></i>
            <span className="visually-hidden">Interior</span>
          </Link>
          <Link to="/studio" className="service-line">
            <span>Conservation</span>
            <figure><img src="images/material-study.jpg" alt="Architectural material study" loading="lazy" /></figure>
            <i><ArrowUpRight size={19} weight="light" /></i>
          </Link>
        </div>
      </section>

      <section className="studio-preview page-pad">
        <div className="studio-preview__image" data-image-reveal data-parallax>
          <img src="images/liberation-courtyard.jpg" alt="Liberation courtyard in use" loading="lazy" />
        </div>
        <div className="studio-preview__copy">
          <p data-reveal>{practiceCopy.intent}</p>
          <div className="studio-preview__principles" data-reveal>
            <span>Program before gesture</span>
            <span>Economy with purpose</span>
            <span>Material that belongs</span>
            <span>Learning through iteration</span>
          </div>
          <Link className="studio-preview__link" to="/studio">Our story <ArrowUpRight size={18} weight="light" /></Link>
        </div>
      </section>

      <section className="home-journal page-pad">
        <div className="home-journal__heading" data-reveal>
          <h2>Research and process</h2>
          <Link to="/journal">Open journal <ArrowUpRight size={16} weight="light" /></Link>
        </div>
        <div className="home-journal__grid">
          {studies.map((study, index) => (
            <article key={study.title} className={`home-journal__item home-journal__item--${index + 1}`} data-reveal>
              <div data-image-reveal><img src={study.image} alt={study.title} loading="lazy" /></div>
              <p>{study.type}</p>
              <h3>{study.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="home-contact page-pad">
        <div className="home-contact__image" data-image-reveal data-parallax><img src="images/spirit-garden.jpg" alt="Garden elevation at Spirit of the Place" loading="lazy" /></div>
        <div className="home-contact__copy" data-reveal>
          <p>Planning a home, interior or adaptive reuse project?</p>
          <h2>Begin a project with us.</h2>
          <Link to="/contact">Contact <ArrowUpRight size={18} weight="light" /></Link>
        </div>
      </section>
    </>
  );
}
