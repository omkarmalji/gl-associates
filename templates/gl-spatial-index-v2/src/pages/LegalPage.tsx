import { Link } from "react-router-dom";

export function LegalPage({ type }: { type: "Privacy" | "Terms" }) {
  return (
    <section className="legal-page">
      <div className="legal-page__inner">
        <Link to="/">Gayatri Lokesh Architects LLP</Link>
        <h1>{type}</h1>
        {type === "Privacy" ? (
          <div>
            <p>This website does not use advertising cookies or sell visitor data.</p>
            <p>Information submitted through the inquiry form is sent to the studio and used only to respond to the inquiry and maintain project correspondence.</p>
            <p>To request access, correction or deletion of correspondence, email the studio.</p>
          </div>
        ) : (
          <div>
            <p>Images and project material on this website belong to Gayatri Lokesh Architects LLP unless a credit states otherwise.</p>
            <p>Website content presents the studio's work and does not constitute a contractual offer. Scope, fees and timelines are confirmed separately in writing.</p>
            <p>Content may not be reproduced without written permission.</p>
          </div>
        )}
        <a href="mailto:projects@gl-associates.net">projects@gl-associates.net</a>
      </div>
    </section>
  );
}
