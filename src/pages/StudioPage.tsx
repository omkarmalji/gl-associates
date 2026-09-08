import { ArrowUpRight } from "@phosphor-icons/react";
import { PageLink as Link } from "../components/PageLink";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { practice, projects } from "../data";

export function StudioPage() {
  const scenes: Scene[] = [
    { id: "manifesto", label: "Studio", className: "scene--paper", content: <StudioManifesto /> },
    { id: "people", label: "The founders", className: "scene--paper", content: <Founders /> },
    { id: "method", label: "How we think", className: "scene--paper", content: <Method /> },
    { id: "fields", label: "Fields of practice", className: "scene--paper", content: <Fields /> },
    { id: "contact", label: "Work with us", className: "scene--charcoal", content: <StudioContact /> },
  ];
  return <SceneDeck scenes={scenes} ariaLabel="Studio profile" />;
}

function StudioManifesto() {
  return (
    <article className="studio-manifesto">
      <img src="images/gl-associates-logo-transparent.png" alt="Gayatri Lokesh Architects logo" />
      <h1>{practice.lead} <span>{practice.continuation}</span></h1>
      <p>{practice.philosophy}</p>
    </article>
  );
}
function Founders() {
  return (
    <article className="founders-scene">
      <div className="founder founder--gayatri">
        <img src="images/gayatri.jpg" alt="Gayatri Deshmukh" />
        <div><h2>Gayatri Deshmukh</h2><p>Co-founder, architect and conservationist</p></div>
      </div>
      <div className="founder founder--lokesh">
        <img src="images/original/team-01.jpg" alt="Lokesh Kadam" />
        <div><h2>Lokesh Kadam</h2><p>Co-founder, architect and designer</p></div>
      </div>
      <p className="founders-scene__statement">The practice grows through observation, mentorship and the relationships that hold a project together.</p>
    </article>
  );
}

function Method() {
  return (
    <article className="method-scene">
      <div className="method-scene__media method-scene__media--one"><ResponsiveImage image={projects[0].images[6]} /></div>
      <div className="method-scene__media method-scene__media--two"><ResponsiveImage image={projects[5].images[1]} /></div>
      <div className="method-scene__copy">
        <h2>We begin with questions.</h2>
        <p>Program, economy, climate and belonging are tested together. Research and drawing are not separate phases; they remain active throughout the work.</p>
      </div>
    </article>
  );
}

function Fields() {
  const fields = [
    ["Architecture", "Homes, institutions and mixed-use projects"],
    ["Conservation", "Adaptive reuse, archives and living heritage"],
    ["Interior", "Workplaces, homes and public environments"],
    ["Landscape", "Precincts, campuses and ecological systems"],
    ["Research", "Material, social and spatial inquiry"],
  ];
  return (
    <article className="fields-scene">
      <h2>One practice, many scales.</h2>
      <div className="fields-scene__grid">
        {fields.map(([title, text], index) => (
          <div key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></div>
        ))}
      </div>
    </article>
  );
}

function StudioContact() {
  return (
    <article className="studio-contact">
      <span>Projects, collaborations and conversations</span>
      <Link to="/contact">Contact the studio <ArrowUpRight weight="light" /></Link>
      <div><a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a><span>Mumbai and Pune</span></div>
    </article>
  );
}
