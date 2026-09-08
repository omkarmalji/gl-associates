import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { projects } from "../data";

export function ProcessPage() {
  const scenes: Scene[] = [
    { id: "begin", label: "Process", className: "scene--paper", content: <ProcessOpening /> },
    { id: "draw", label: "Draw and test", className: "scene--paper", content: <DrawingScene /> },
    { id: "observe", label: "Observe and adapt", className: "scene--image", content: <ObservationScene /> },
    { id: "materials", label: "Material intelligence", className: "scene--paper", content: <MaterialScene /> },
  ];
  return <SceneDeck scenes={scenes} ariaLabel="Design process" />;
}

function ProcessOpening() {
  return (
    <article className="process-opening">
      <h1>Learn.<br />Unlearn.<br /><span>Relearn.</span></h1>
      <p>Every project begins by questioning the brief and understanding the systems already present: social, material, economic and ecological.</p>
      <div className="process-opening__images">
        <ResponsiveImage image={projects[5].images[1]} />
        <ResponsiveImage image={projects[1].images[5]} />
      </div>
    </article>
  );
}
function DrawingScene() {
  return (
    <article className="drawing-scene">
      <div className="drawing-scene__main"><ResponsiveImage image={projects[0].images[6]} /></div>
      <div className="drawing-scene__detail"><ResponsiveImage image={projects[5].images[6]} /></div>
      <div className="drawing-scene__copy"><h2>Drawing is a way of thinking.</h2><p>Plans, models and sections keep ideas measurable. They expose relationships that images alone cannot resolve.</p></div>
    </article>
  );
}

function ObservationScene() {
  return (
    <article className="observation-scene">
      <ResponsiveImage image={projects[0].images[4]} />
      <div><h2>Space is understood in use.</h2><p>Movement, climate, maintenance and daily rituals reshape the first idea into architecture that belongs.</p></div>
    </article>
  );
}

function MaterialScene() {
  return (
    <article className="material-scene">
      <p className="material-scene__backdrop">Material</p>
      <div className="material-scene__one"><ResponsiveImage image={projects[6].images[4]} /></div>
      <div className="material-scene__two"><ResponsiveImage image={projects[8].images[4]} /></div>
      <div className="material-scene__copy"><h2>Economy becomes expression.</h2><p>Material choices connect climate, labour, longevity and the character of a place.</p></div>
    </article>
  );
}
