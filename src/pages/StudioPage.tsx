import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { practiceCopy } from "../data";

const process = [
  { title: "Listen", copy: "We begin with the people, site, climate, budget and existing patterns of use." },
  { title: "Question", copy: "Drawings and models test assumptions before form settles into a clear direction." },
  { title: "Make", copy: "Material, detail and construction are developed with the people who will build the work." },
  { title: "Learn", copy: "Each completed project informs the next without becoming a formula for it." },
];

export function StudioPage() {
  return (
    <>
      <section className="studio-hero page-pad">
        <div data-reveal>
          <p>Studio</p>
          <h1>Curiosity builds the practice.</h1>
        </div>
        <figure data-image-reveal><img src="images/original/home-04.jpg" alt="Architectural study model" /></figure>
      </section>

      <section className="manifesto page-pad">
        <p data-reveal>{practiceCopy.intent}</p>
        <p data-reveal>{practiceCopy.philosophy}</p>
      </section>

      <section className="studio-collage page-pad">
        <figure data-image-reveal><img src="images/spirit-site.jpg" alt="Spirit of the Place under construction" loading="lazy" /></figure>
        <figure data-image-reveal><img src="images/material-study.jpg" alt="Material and drawing study" loading="lazy" /></figure>
        <p data-reveal>We work across architecture, interiors and conservation. The scale changes, but attention to context and daily life remains constant.</p>
      </section>

      <section className="process page-pad">
        <h2 data-reveal>How we work</h2>
        <div className="process__grid">
          {process.map((item) => (
            <article key={item.title} data-reveal>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wide-image" data-image-reveal data-parallax><img src="images/liberation-courtyard.jpg" alt="Liberation courtyard in use" loading="lazy" /></section>
      <section className="next-page page-pad" data-reveal><p>Meet the people responsible for the work.</p><Link to="/team">Meet the team <ArrowUpRight size={18} weight="light" /></Link></section>
    </>
  );
}
