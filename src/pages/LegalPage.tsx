import { Link } from "react-router-dom";

export function LegalPage({ type }: { type: "Privacy" | "Terms" }) {
  return (
    <section className="legal page-pad">
      <Link to="/">Gayatri Lokesh Architects</Link>
      <h1>{type}</h1>
      {type === "Privacy" ? (
        <><p>This website does not set advertising cookies or sell visitor data. Contact details entered into the inquiry form remain on your device until your email application opens.</p><p>If you email the studio, your message and contact information are used only to respond to your inquiry and maintain project correspondence.</p></>
      ) : (
        <><p>Images and project material on this website belong to Gayatri Lokesh Architects LLP unless noted otherwise.</p><p>Website content presents the studio&apos;s work and does not constitute a contractual offer. Project scope, fees and timelines are confirmed separately in writing.</p></>
      )}
      <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
    </section>
  );
}
