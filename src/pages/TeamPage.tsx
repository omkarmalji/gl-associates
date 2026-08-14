import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const people = [
  {
    name: "Gayatri",
    role: "Co-founder and principal architect",
    credentials: "M.Arch Conservation & Regeneration, B.Arch",
    image: "images/original/team-02.jpg",
    bio: "Gayatri is an architect and conservation architect with experience across commercial and heritage projects in Maharashtra. An alumna of Brick School of Architecture, Pune and CEPT University, Ahmedabad, she combines academic rigour with diverse field experience.",
  },
  {
    name: "Lokesh",
    role: "Co-founder and principal architect",
    credentials: "BIM, B.Arch",
    image: "images/original/team-01.jpg",
    bio: "Lokesh translates complex, large-scale briefs into refined architectural realities. A Pune University graduate, his experience spans institutional, resort and high-end residential projects across India, joining technical expertise with context-driven execution.",
  },
];

export function TeamPage() {
  return (
    <>
      <section className="inner-hero page-pad">
        <p data-reveal>People</p>
        <h1><span data-line-reveal>Two minds.</span><br /><span data-line-reveal>One evolving</span> <span data-line-reveal className="display-italic">practice.</span></h1>
      </section>
      <section className="team-list page-pad">
        {people.map((person, index) => (
          <article className="person" key={person.name}>
            <figure data-reveal data-parallax><img src={person.image} alt={`${person.name}, ${person.role}`} /></figure>
            <div className="person__copy" data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{person.name}</h2>
              <p className="person__role">{person.role}<br />{person.credentials}</p>
              <p>{person.bio}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="next-page page-pad" data-reveal><p>Have a project or collaboration in mind?</p><Link to="/contact">Contact the studio <ArrowUpRight size={18} /></Link></section>
    </>
  );
}
