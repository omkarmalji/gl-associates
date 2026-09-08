import { ArrowUpRight } from "@phosphor-icons/react";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { SceneDeck, type Scene } from "../components/SceneDeck";
import { projects } from "../data";

export function ContactPage() {
  const scenes: Scene[] = [
    { id: "hello", label: "Contact", className: "scene--paper", content: <ContactOpening /> },
    { id: "inquiry", label: "Project inquiry", className: "scene--paper", content: <ProjectForm /> },
  ];
  return <SceneDeck scenes={scenes} ariaLabel="Contact the studio" />;
}

function ContactOpening() {
  return (
    <article className="contact-opening">
      <div className="contact-opening__copy">
        <h1>Bring us a place, a question or an unfinished idea.</h1>
        <div>
          <p>Flat no. 202, 555 Narayan Chambers<br />Opp. Narayan Peth Police Chowki<br />Pune 411030</p>
          <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
          <a href="tel:+917507353159">+91 75073 53159</a>
        </div>
      </div>
      <div className="contact-opening__image"><ResponsiveImage image={projects[1].images[0]} /></div>
    </article>
  );
}
function ProjectForm() {
  return (
    <article className="project-form-scene">
      <div className="project-form-scene__intro"><h2>Project inquiry</h2><p>Share what you know today. The first conversation can shape the rest.</p></div>
      <form className="project-form" action="https://formsubmit.co/projects@gl-associates.net" method="POST">
        <input type="hidden" name="_subject" value="New GL Associates project inquiry" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://omkarmalji.github.io/gl-associates/#/contact?sent=true" />
        <label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label>
        <label><span>Email</span><input type="email" name="email" autoComplete="email" required /></label>
        <label><span>Phone <small>Optional</small></span><input type="tel" name="phone" autoComplete="tel" /></label>
        <label><span>Project type</span><select name="projectType" required defaultValue=""><option value="" disabled>Select</option><option>Architecture</option><option>Interior</option><option>Conservation</option><option>Collaboration</option><option>Other</option></select></label>
        <label><span>Location</span><input type="text" name="location" autoComplete="address-level2" required /></label>
        <label className="project-form__message"><span>Tell us about the project</span><textarea name="message" rows={4} minLength={20} required /></label>
        <button type="submit">Send inquiry <ArrowUpRight weight="light" /></button>
      </form>
    </article>
  );
}
