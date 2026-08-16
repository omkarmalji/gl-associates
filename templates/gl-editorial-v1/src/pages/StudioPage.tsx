import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { practiceCopy } from "../data";

export function StudioPage() {
  return (
    <>
      <section className="inner-hero page-pad">
        <p data-reveal>Studio</p>
        <h1><span data-line-reveal>Curiosity</span><br /><span data-line-reveal>builds the</span> <span data-line-reveal className="display-italic">practice.</span></h1>
      </section>
      <section className="manifesto page-pad">
        <h2 data-reveal>Design intent</h2>
        <p data-reveal>{practiceCopy.intent}</p>
        <p data-reveal>{practiceCopy.philosophy}</p>
      </section>
      <section className="studio-image-pair page-pad">
        <figure data-reveal data-parallax><img src="images/original/home-04.jpg" alt="Architectural study model" /></figure>
        <figure data-reveal data-parallax><img src="images/original/projects-03.jpg" alt="Spirit of the Place landscape proposal" /></figure>
      </section>
      <section className="values-list page-pad">
        {["Program before gesture", "Economy with purpose", "Material that belongs", "Learning through iteration"].map((item, index) => (
          <div key={item} data-reveal><span>{String(index + 1).padStart(2, "0")}</span><h2>{item}</h2></div>
        ))}
      </section>
      <section className="wide-image" data-parallax><img src="images/liberation-courtyard.jpg" alt="Liberation courtyard in use" loading="lazy" /></section>
      <section className="next-page page-pad" data-reveal><p>Meet the people behind the work.</p><Link to="/team">Our team <ArrowUpRight size={18} /></Link></section>
    </>
  );
}
