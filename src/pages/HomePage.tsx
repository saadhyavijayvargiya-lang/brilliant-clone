import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="page hero-page">
      <section className="hero-card">
        <div className="eyebrow">Probability · Random walks</div>
        <h1>Learn random walks by walking them.</h1>
        <p>
          Pathwise is a dark-mode, Brilliant-style course where every concept is
          taught through short interactive steps, instant feedback, and a path
          that remembers where you stopped.
        </p>
        <div className="hero-actions">
          <Link className="button" to="/course">
            Start the course
          </Link>
          <Link className="button button-secondary" to="/lesson/L1">
            Jump into lesson 1
          </Link>
        </div>
      </section>
    </main>
  );
}
