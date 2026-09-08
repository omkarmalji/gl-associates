import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span>404</span>
      <h1>This space does not exist.</h1>
      <Link to="/"><ArrowLeft weight="light" /> Return home</Link>
    </section>
  );
}
