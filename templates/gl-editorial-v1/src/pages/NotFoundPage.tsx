import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found page-pad">
      <p>404</p><h1>This space<br />does not <span className="display-italic">exist.</span></h1>
      <Link to="/"><ArrowLeft size={17} weight="light" /> Return home</Link>
    </section>
  );
}
