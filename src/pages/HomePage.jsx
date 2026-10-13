import { useNavigate } from "react-router-dom";

export default function HomePage({ currentUser, onSelectCourse }) {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <div>
          <span className="hero-tag">
            PYTHON • DATA ANALYSIS • MACHINE LEARNING
          </span>
          <h1>Smart Python Analysis</h1>
          <h2>Turn Raw Datasets Into Actionable Smart Insights</h2>
          <p className="hero-desc">
            A modern, interactive platform built for engineers, students, and analysts.
            Manipulate tabular datasets, detect schema types, perform automated data cleaning,
            execute Python calculations in real time, and earn verified certifications.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/courses")}>
              Explore Courses →
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/verify")}
            >
              Verify a Certificate
            </button>
            {!currentUser ? (
              <button
                style={{
                  padding: "10px 18px",
                  border: "1px solid rgba(103, 234, 219, 0.3)",
                  borderRadius: "10px",
                  background: "rgba(103, 234, 219, 0.1)",
                  color: "#67eadb",
                  fontWeight: "700"
                }}
                onClick={() => navigate("/login")}
              >
                Launch Workspace Demo ⚡
              </button>
            ) : (
              <button
                style={{
                  padding: "10px 18px",
                  border: "1px solid rgba(103, 234, 219, 0.3)",
                  borderRadius: "10px",
                  background: "rgba(103, 234, 219, 0.1)",
                  color: "#67eadb",
                  fontWeight: "700"
                }}
                onClick={() => navigate("/app/dashboard")}
              >
                Open Dashboard 🚀
              </button>
            )}
          </div>
        </div>

        {/* HERO INTERACTIVE PREVIEW */}
        <div className="hero-preview-box">
          <span className="preview-pill">● LIVE IN-BROWSER WORKSPACE</span>
          <h3 style={{ marginBottom: "12px", color: "#ffffff", fontSize: "18px" }}>
            Python Pandas & Statistical Engine
          </h3>
          <div
            style={{
              background: "#080c16",
              padding: "16px",
              borderRadius: "12px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "#67eadb",
              lineHeight: "1.7",
              marginBottom: "16px"
            }}
          >
            <div>import pandas as pd</div>
            <div>df = pd.read_csv("dataset.csv")</div>
            <div style={{ color: "#a5b4fc" }}># Auto-imputing missing values & computing stats</div>
            <div style={{ color: "#f59e0b" }}>Output: 5 rows audited, 0 duplicates, 100% complete</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div style={{ padding: "12px", background: "#111829", borderRadius: "10px" }}>
              <small style={{ color: "#8d98b0" }}>Active Dataset</small>
              <div style={{ fontWeight: "700", color: "#ffffff" }}>sample_data.csv</div>
            </div>
            <div style={{ padding: "12px", background: "#111829", borderRadius: "10px" }}>
              <small style={{ color: "#8d98b0" }}>Data Quality</small>
              <div style={{ fontWeight: "700", color: "#22c55e" }}>100% Clean</div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Why Choose Smart Python Analysis?</h2>
          <p>
            Experience the power of Python without complicated local environments.
            Everything you need to analyze, clean, visualize, and model data runs in your browser.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🐍</div>
            <h3>In-Browser Python Execution</h3>
            <p>
              Write and run Python analytical code with Pandas-style statistics directly
              inside your browser.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧹</div>
            <h3>Automated Data Cleaning</h3>
            <p>
              One-click duplicate detection, row pruning, and numerical mean/median imputation
              to restore dirty datasets.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dynamic Data Visualizations</h3>
            <p>
              Instant SVG bar charts, trend lines, and proportional distribution pie charts
              bound to your data records.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Verifiable Digital Certificates</h3>
            <p>
              Earn industry-recognized certificates with unique IDs that can be publicly verified
              by employers anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES PREVIEW */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2>Featured Certification Programs</h2>
          <p>
            Hands-on curriculum crafted to take you from foundational Python syntax to
            practical machine learning.
          </p>
        </div>

        <div className="course-preview-grid">
          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(0, 212, 255, 0.15)", color: "#00d4ff" }}>
                CORE TRACK • 8 WEEKS
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Python for Data Analysis
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                Master data structures, NumPy arrays, Pandas DataFrames, and exploratory
                data analysis with real tabular datasets.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  onSelectCourse("python");
                  navigate("/courses");
                }}
              >
                View Syllabus & Enroll →
              </button>
            </div>
          </div>

          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(124, 92, 255, 0.15)", color: "#c084fc" }}>
                SPECIALIZATION • 6 WEEKS
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Data Visualization Studio
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                Design compelling charts, trend plots, distribution graphs, and interactive
                executive visual reports.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  onSelectCourse("visualization");
                  navigate("/courses");
                }}
              >
                View Syllabus & Enroll →
              </button>
            </div>
          </div>

          <div className="course-card-preview">
            <div>
              <span className="badge-tag" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                ADVANCED • 10 WEEKS
              </span>
              <h3 style={{ margin: "14px 0 8px", fontSize: "20px", color: "#ffffff" }}>
                Practical Machine Learning
              </h3>
              <p style={{ color: "#8d98b0", fontSize: "14px", lineHeight: "1.7", marginBottom: "16px" }}>
                Construct regression predictors, classification models, evaluation metrics, and
                supervised ML workflows.
              </p>
            </div>
            <div>
              <button
                className="btn-secondary"
                style={{ width: "100%" }}
                onClick={() => {
                  onSelectCourse("ml");
                  navigate("/courses");
                }}
              >
                View Syllabus & Enroll →
              </button>
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="cta-banner">
          <div>
            <h2>Ready to Elevate Your Data Analysis Skills?</h2>
            <p>Join Smart Python Analysis today and access all interactive tools.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Create Free Account
            </button>
            <button className="btn-secondary" onClick={() => navigate("/login")}>
              Login to Workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
