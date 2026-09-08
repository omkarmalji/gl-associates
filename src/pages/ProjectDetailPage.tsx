import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { PageLink as Link } from "../components/PageLink";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { getNextProject, getProject, type Project } from "../data";
import { NotFoundPage } from "./NotFoundPage";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFoundPage />;
  const nextProject = getNextProject(project.slug);
  const images = project.images;
  const scenes: Scene[] = [
    { id: "introduction", label: project.shortTitle, className: "scene--project", content: <ProjectIntroduction project={project} /> },
    { id: "intent", label: "Project intent", className: "scene--paper", content: <ProjectStatement project={project} /> },
    { id: "view-one", label: "Spatial view", className: "scene--image", content: <FullProjectImage project={project} imageIndex={Math.min(2, images.length - 1)} /> },
    { id: "view-two", label: "Material and space", className: "scene--paper", content: <ProjectPair project={project} first={Math.min(3, images.length - 1)} second={Math.min(4, images.length - 1)} /> },
    ...(images.length > 5 ? [{ id: "study", label: "Drawing and detail", className: "scene--paper", content: <ProjectStudy project={project} /> }] : []),
    { id: "next", label: "Next project", className: "scene--charcoal", content: <NextProject current={project} next={nextProject} /> },
  ];
  return <SceneDeck key={project.slug} scenes={scenes} ariaLabel={`${project.title} project story`} />;
}

function ProjectIntroduction({ project }: { project: Project }) {
  return (
    <article className="project-intro" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className={`project-intro__info project-intro__info--${project.ink}`}>
        <Link className="project-intro__back" to="/projects"><ArrowLeft weight="light" /> All projects</Link>
        <div className="project-intro__data">
          <span>{project.category}</span>
          <dl>
            <div><dt>Location</dt><dd>{project.location}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
            {project.area && <div><dt>Area</dt><dd>{project.area}</dd></div>}
          </dl>
        </div>
        <h1>{project.title}</h1>
      </div>
      <div className="project-intro__image"><ResponsiveImage image={project.images[0]} eager /></div>
    </article>
  );
}
function ProjectStatement({ project }: { project: Project }) {
  const image = project.images[Math.min(1, project.images.length - 1)];
  return (
    <article className="project-statement">
      <p>{project.statement}</p>
      <div className="project-statement__frame"><ResponsiveImage image={image} /></div>
      <span>{project.summary}</span>
    </article>
  );
}

function FullProjectImage({ project, imageIndex }: { project: Project; imageIndex: number }) {
  return (
    <article className="project-full-image">
      <ResponsiveImage image={project.images[imageIndex]} />
      <div className="project-full-image__caption"><span>{project.shortTitle}</span><span>{project.location}</span></div>
    </article>
  );
}

function ProjectPair({ project, first, second }: { project: Project; first: number; second: number }) {
  return (
    <article className="project-pair">
      <div className="project-pair__one"><ResponsiveImage image={project.images[first]} /></div>
      <div className="project-pair__two"><ResponsiveImage image={project.images[second]} /></div>
      <p>{project.shortTitle}</p>
    </article>
  );
}

function ProjectStudy({ project }: { project: Project }) {
  const first = project.images[project.images.length - 2];
  const second = project.images[project.images.length - 1];
  return (
    <article className="project-study">
      <div className="project-study__large"><ResponsiveImage image={first} /></div>
      <div className="project-study__small"><ResponsiveImage image={second} /></div>
      <p>Process is kept visible: drawings, models and material tests remain part of the completed spatial story.</p>
    </article>
  );
}

function NextProject({ current, next }: { current: Project; next: Project }) {
  return (
    <article className="next-project">
      <span>After {current.shortTitle}</span>
      <Link to={`/projects/${next.slug}`}>
        <span>{next.shortTitle}</span>
        <ArrowUpRight weight="light" />
      </Link>
      <div className="next-project__image"><ResponsiveImage image={next.images[0]} /></div>
    </article>
  );
}
