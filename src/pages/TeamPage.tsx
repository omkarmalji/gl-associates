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
      <section className="team-header page-pad">
        <p data-reveal>People</p>
        <h1 data-reveal>Two perspectives. One evolving practice.</h1>
      </section>
      <section className="team-list page-pad">
        {people.map((person) => (
          <article className="person" key={person.name}>
            <figure data-image-reveal><img src={person.image} alt={`${person.name}, ${person.role}`} /></figure>
            <div className="person__copy" data-reveal>
              <p className="person__role">{person.role}<br />{person.credentials}</p>
              <h2>{person.name}</h2>
              <p>{person.bio}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="team-collaboration page-pad" data-reveal>
        <p>The practice grows through close collaboration with clients, craftspeople, consultants and builders.</p>
        <Link to="/contact">Contact <ArrowUpRight size={18} weight="light" /></Link>
      </section>
    </>
  );
}
