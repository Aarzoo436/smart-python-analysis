export default function ProgressPage() {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📈</span>
        <div>
          <p>MILESTONES & LABS</p>
          <h2>My Progress</h2>
          <p>Track modules completed, hours logged, and analysis achievements.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Overall Course Progress</h2>
        <div className="progress-bar" style={{ margin: "15px 0" }}>
          <div className="progress-fill" style={{ width: "68%" }} />
        </div>
        <p style={{ color: "#cbd5e1" }}>68% of learning journey completed.</p>

        <div className="stats-grid" style={{ marginTop: "25px" }}>
          <div className="stat-card">
            <span>🧪</span>
            <div>
              <small>Completed Labs</small>
              <h3>24 Labs</h3>
            </div>
          </div>
          <div className="stat-card">
            <span>📂</span>
            <div>
              <small>Datasets Analyzed</small>
              <h3>12 Datasets</h3>
            </div>
          </div>
          <div className="stat-card">
            <span>🎓</span>
            <div>
              <small>Certificates</small>
              <h3>1 Earned</h3>
            </div>
          </div>
          <div className="stat-card">
            <span>⏱️</span>
            <div>
              <small>Study Hours</small>
              <h3>48 Hours</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
