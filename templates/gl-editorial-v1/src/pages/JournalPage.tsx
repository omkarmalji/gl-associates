import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const studies = [
  { title: "Learning from the site", type: "Site study", date: "March 2025", image: "images/spirit-site.jpg", copy: "Observation on site often changes the question before it changes the drawing." },
  { title: "Plans as conversations", type: "Drawing", date: "November 2024", image: "images/original/tidy-04.jpg", copy: "Plans help clients, consultants and makers see the same possibilities from different positions." },
  { title: "Local systems", type: "Material research", date: "June 2024", image: "images/liberation-structure.jpg", copy: "Material decisions connect climate, labour, economy and the character of a place." },
  { title: "Making room for light", type: "Detail", date: "January 2024", image: "images/spirit-oculus.jpg", copy: "Openings are treated as spatial instruments rather than decoration." },
];

export function JournalPage() {
  return (
    <>
      <section className="journal-header page-pad">
        <p data-reveal>Journal</p>
        <h1 data-reveal>Work remains open to discovery.</h1>
      </section>
      <section className="journal-lead page-pad">
        <figure data-image-reveal><img src="images/original/tidy-10.jpg" alt="A Tidy Space exploded axonometric drawing" /></figure>
        <div data-reveal>
          <p>Research and process</p>
          <h2>Learn, unlearn, relearn.</h2>
          <p>The studio uses drawings, models, site observation and material testing to keep each project responsive to what it finds.</p>
        </div>
      </section>
      <section className="journal-grid page-pad">
        {studies.map((study) => (
          <article key={study.title} data-reveal>
            <div data-image-reveal><img src={study.image} alt={study.title} loading="lazy" /></div>
            <p>{study.type}<span>{study.date}</span></p>
            <h2>{study.title}</h2>
            <p>{study.copy}</p>
          </article>
        ))}
      </section>
      <section className="next-page page-pad" data-reveal><p>See how research becomes built work.</p><Link to="/projects">View projects <ArrowUpRight size={18} weight="light" /></Link></section>
    </>
  );
}
