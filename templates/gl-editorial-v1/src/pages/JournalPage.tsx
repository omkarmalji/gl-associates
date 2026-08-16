import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const studies = [
  { title: "Learning from the site", type: "Field study", image: "images/spirit-site.jpg" },
  { title: "Plans as conversations", type: "Drawing", image: "images/original/tidy-04.jpg" },
  { title: "Local systems", type: "Material research", image: "images/liberation-structure.jpg" },
  { title: "Making room for light", type: "Detail", image: "images/spirit-oculus.jpg" },
];

export function JournalPage() {
  return (
    <>
      <section className="inner-hero page-pad">
        <p data-reveal>Journal</p>
        <h1><span data-line-reveal>Work is a</span><br /><span data-line-reveal>continuous</span> <span data-line-reveal className="display-italic">study.</span></h1>
      </section>
      <section className="journal-lead page-pad">
        <figure data-reveal data-parallax><img src="images/original/tidy-10.jpg" alt="A Tidy Space exploded axonometric drawing" /></figure>
        <div data-reveal><p>Research and process</p><h2>Learn, unlearn, relearn.</h2><p>The studio uses drawings, models, site observation and material testing to keep each project open to discovery.</p></div>
      </section>
      <section className="journal-grid page-pad">
        {studies.map((study) => (
          <article key={study.title} data-reveal>
            <div data-parallax><img src={study.image} alt={study.title} loading="lazy" /></div>
            <p>{study.type}</p><h2>{study.title}</h2>
          </article>
        ))}
      </section>
      <section className="next-page page-pad" data-reveal><p>See how research becomes built work.</p><Link to="/projects">Explore projects <ArrowUpRight size={18} /></Link></section>
    </>
  );
}
