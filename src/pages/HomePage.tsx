import { ArrowUpRight } from "@phosphor-icons/react";
import { PageLink as Link } from "../components/PageLink";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { featuredProjects, practice, projects, type Project } from "../data";

export function HomePage() {
  const scenes: Scene[] = [
    {
      id: "opening",
      label: featuredProjects[0].shortTitle,
      className: "scene--image",
      content: <ProjectHero project={featuredProjects[0]} eager />,
    },
    {
      id: "opening-study",
      label: "Inside the school",
      className: "scene--paper",
      content: <ProjectComposition project={featuredProjects[0]} />,
    },
    ...featuredProjects.slice(1).map((project, index): Scene => ({
      id: project.slug,
      label: project.shortTitle,
      className: "scene--image",
      content: <ProjectHero project={project} variant={index % 3} />,
    })),
    {
      id: "practice",
      label: "The practice",
      className: "scene--paper",
      content: <Manifesto />,
    },
    {
      id: "typologies",
      label: "Fields of work",
      className: "scene--paper",
      content: <TypologyIndex />,
    },
    {
      id: "contact",
      label: "Start a conversation",
      className: "scene--charcoal",
      content: <ClosingScene />,
    },
  ];

  return <SceneDeck scenes={scenes} ariaLabel="Gayatri Lokesh Architects featured work" />;
}

function ProjectHero({ project, eager = false, variant = 0 }: { project: Project; eager?: boolean; variant?: number }) {
  return (
    <article className={`project-hero project-hero--${variant} ${project.slug === "brick-abode" ? "project-hero--high-key" : ""}`}>
      <ResponsiveImage image={project.images[0]} eager={eager} />
      <div className="project-hero__veil" />
      <h1><span>{project.shortTitle}</span></h1>
      <div className="project-hero__meta">
        <span>Project</span>
        <p>{project.location}<br />{project.status}</p>
      </div>
      <div className="project-hero__summary">
        <span>Intent</span>
        <p>{project.summary}</p>
      </div>
      <Link className="project-hero__link" to={`/projects/${project.slug}`} aria-label={`View ${project.title}`}>
        <ArrowUpRight size={22} weight="light" />
      </Link>
    </article>
  );
}
function ProjectComposition({ project }: { project: Project }) {
  return (
    <article className="project-composition" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="project-composition__image project-composition__image--large">
        <ResponsiveImage image={project.images[3]} />
      </div>
      <div className="project-composition__image project-composition__image--small">
        <ResponsiveImage image={project.images[5]} />
      </div>
      <div className="project-composition__slab">
        <p>{project.title}</p>
        <dl>
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Typology</dt><dd>{project.category}</dd></div>
          <div><dt>Status</dt><dd>{project.status}</dd></div>
        </dl>
        <Link to={`/projects/${project.slug}`}>View project <ArrowUpRight weight="light" /></Link>
      </div>
      <p className="project-composition__ghost">Learning</p>
    </article>
  );
}

function Manifesto() {
  return (
    <article className="manifesto-scene">
      <div className="manifesto-scene__identity">
        <img src="images/gl-associates-logo-transparent.png" alt="Gayatri Lokesh Architects logo" />
      </div>
      <p className="manifesto-scene__copy">
        <span>{practice.lead}</span>{" "}
        <span>{practice.continuation}</span>
      </p>
      <Link to="/studio">Meet the studio <ArrowUpRight weight="light" /></Link>
    </article>
  );
}

function TypologyIndex() {
  const categories = [
    { label: "Architecture", image: projects[5].images[4], href: "/projects?type=Residential" },
    { label: "Institutions", image: projects[0].images[2], href: "/projects?type=Institutional" },
    { label: "Culture", image: projects[2].images[2], href: "/projects?type=Culture" },
    { label: "Interior", image: projects[8].images[1], href: "/projects?type=Interior" },
  ];
  return (
    <article className="typology-scene">
      <p className="typology-scene__backdrop">Architecture / Interior / Culture /</p>
      <div className="typology-scene__list">
        {categories.map((category, index) => (
          <Link to={category.href} key={category.label} className="typology-link">
            <span>{category.label}</span>
            <span className="typology-link__image"><ResponsiveImage image={category.image} /></span>
            <span className="typology-link__arrow"><ArrowUpRight weight="light" /></span>
            <small>{String(index + 1).padStart(2, "0")}</small>
          </Link>
        ))}
      </div>
    </article>
  );
}

function ClosingScene() {
  return (
    <article className="closing-scene">
      <div className="closing-scene__contacts">
        <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
        <a href="tel:+917507353159">+91 75073 53159</a>
        <span>Mumbai and Pune</span>
      </div>
      <Link to="/contact" className="closing-scene__title">
        Begin a project
        <ArrowUpRight weight="light" />
      </Link>
      <div className="closing-scene__footer">
        <span>Gayatri Lokesh Architects LLP © 2026</span>
        <span><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></span>
      </div>
    </article>
  );
}
