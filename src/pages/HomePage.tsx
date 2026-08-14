import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../components/ProjectCard";
import { practiceCopy, projects } from "../data";

export function HomePage() {
  return (
    <>
      <section className="hero home-hero">
        <img className="hero__image" src="images/hero-liberation.jpg" alt="Liberation project by Gayatri Lokesh Architects" fetchPriority="high" />
        <div className="hero__wash" />
        <h1 className="hero__title"><span data-line-reveal>Liber</span><span data-line-reveal className="display-italic">ation</span></h1>
        <p className="hero__meta">Built with local hands and materials<br />Senegal, 2023</p>
        <Link className="round-link hero__link" to="/projects/liberation" aria-label="View Liberation"><ArrowDownRight size={18} /></Link>
      </section>

      <section className="about page-pad" id="studio">
        <h2 data-reveal>What is <span className="display-italic">GL?</span></h2>
        <p className="about__statement" data-reveal>
          <span className="display-italic">Gayatri Lokesh Architects</span> is a Mumbai and Pune based practice shaped by curiosity, context and belonging. We learn, unlearn and relearn to create architecture with economy, sensibility and visual intelligence.
        </p>
      </section>

      <section className="triptych page-pad" aria-label="Selected architectural details">
        <figure data-reveal data-parallax><img src="images/dolittle-entry.jpg" alt="Bright interior entry at Do Little Space" /></figure>
        <figure data-reveal data-parallax><img src="images/spirit-oculus.jpg" alt="Concrete roof oculus at Spirit of the Place" /></figure>
        <figure data-reveal data-parallax><img src="images/liberation-life.jpg" alt="Shaded courtyard at Liberation" /></figure>
      </section>

      <section className="practice page-pad">
        <div className="practice__intro" data-reveal>
          <h2>What We <span className="display-italic">Do</span></h2>
          <p>{practiceCopy.philosophy}</p>
        </div>
        <div className="practice__chips"><span>Architecture</span><span>Interior</span><span>Conservation</span></div>
        <div className="services-stage">
          <Link to="/projects/architecture" className="service-line"><span>Architecture</span></Link>
          <Link to="/projects/interior" className="service-line service-line--with-image"><img src="images/spirit-garden.jpg" alt="Spirit of the Place garden elevation" loading="lazy" /><span>Interior</span></Link>
          <Link to="/studio" className="service-line"><span className="display-italic">Conservation</span></Link>
        </div>
      </section>

      <section className="feature-project" data-parallax>
        <img src="images/spirit-site.jpg" alt="Spirit of the Place during construction" loading="lazy" />
        <div className="feature-project__scrim" />
        <div className="feature-project__content page-pad">
          <h2 data-reveal>Spirit of the <span className="display-italic">Place</span></h2>
          <p>Residential Architecture, Pune, 2021</p>
          <Link className="round-link" to="/projects/spirit-of-the-place" aria-label="Explore Spirit of the Place"><ArrowUpRight size={18} /></Link>
        </div>
      </section>

      <section className="home-work page-pad">
        <div className="section-heading" data-reveal>
          <h2>Selected <span className="display-italic">Projects</span></h2>
          <Link to="/projects">View all <ArrowUpRight size={16} /></Link>
        </div>
        <div className="home-work__grid">
          {projects.slice(0, 5).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </section>

      <section className="material-story" data-parallax>
        <img src="images/liberation-earth.jpg" alt="Earthen interior and crafted openings at Liberation" loading="lazy" />
        <div className="material-story__shade" />
        <h2 data-reveal>Learn. Unlearn. <span className="display-italic">Relearn.</span></h2>
        <div className="material-story__frames">
          <img src="images/original/tidy-04.jpg" alt="A Tidy Space axonometric study" loading="lazy" />
          <img src="images/spirit-stairs.jpg" alt="Spirit of the Place stair during construction" loading="lazy" />
          <img src="images/dolittle-storage.jpg" alt="Integrated storage at Do Little Space" loading="lazy" />
          <img src="images/liberation-structure.jpg" alt="Liberation structural rhythm" loading="lazy" />
        </div>
        <Link to="/journal">Journal <ArrowUpRight size={16} /></Link>
      </section>

      <section className="home-contact page-pad">
        <div className="home-contact__image" data-reveal data-parallax><img src="images/dolittle-wide.jpg" alt="Open living space at Do Little Space" loading="lazy" /></div>
        <div className="home-contact__copy" data-reveal>
          <h2>Let&apos;s create<br />something<br /><span className="display-italic">timeless</span></h2>
          <Link to="/contact">Start a conversation <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
