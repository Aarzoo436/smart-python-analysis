import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <section className="page">
      <h1 className="page-title">About Smart Python Analysis</h1>
      <p className="page-subtitle">
        Democratizing data science education with interactive in-browser computation and verified credentials.
      </p>

      <div className="features-grid" style={{ marginBottom: "40px" }}>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>
            To provide learners worldwide with hands-on, accessible tools to master Python, data analysis,
            and statistical computing without the friction of environment setup.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔭</div>
          <h3>Our Vision</h3>
          <p>
            To become the premier interactive ecosystem where students, developers, and researchers bridge
            theoretical data science and industry workflows in a unified platform.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💡</div>
          <h3>Our Purpose</h3>
          <p>
            We believe that understanding data is the most critical literacy of the 21st century.
            SPA turns raw rows and columns into meaningful insights through hands-on practice.
          </p>
        </div>
      </div>

      <div className="workspace-card" style={{ padding: "35px" }}>
        <h2 style={{ marginBottom: "14px", color: "#ffffff" }}>The SPA Architecture</h2>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8", marginBottom: "16px" }}>
          Smart Python Analysis (SPA) operates on a modern React 19 architecture with real-time in-browser
          CSV parsing, descriptive statistical calculations, automated quality profiling, and dynamic SVG
          visualizations.
        </p>
        <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
          Every certificate issued by the platform is tied to an immutable record in our verified credential registry,
          enabling students to showcase verified skills to universities, employers, and clients.
        </p>

        <div style={{ marginTop: "25px" }}>
          <button className="btn-primary" onClick={() => navigate("/courses")}>
            Explore Our Courses →
          </button>
        </div>
      </div>
    </section>
  );
}
