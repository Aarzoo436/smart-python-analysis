import { useNavigate } from "react-router-dom";

export default function DashboardPage({
  datasetRows,
  datasetHeaders,
  activeQuality,
  selectedFile,
  analysisDone
}) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="welcome-card">
        <div>
          <p className="small-title">YOUR DATA SCIENCE WORKSPACE</p>
          <h2>
            Turn Data Into <br />
            <span>Smart Insights.</span>
          </h2>
          <p>
            Analyze tabular datasets, prepare clean data, visualize metrics, and
            generate statistical models using Python.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button onClick={() => navigate("/app/python")}>
              Start Python Analysis →
            </button>
            <button
              style={{ background: "#1f293d", color: "#67eadb" }}
              onClick={() => navigate("/app/dataset")}
            >
              Manage Datasets
            </button>
          </div>
        </div>
        <div className="analysis-icon">🐍</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>📂</span>
          <div>
            <small>Active Records</small>
            <h3>{datasetRows.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <span>📊</span>
          <div>
            <small>Total Features</small>
            <h3>{datasetHeaders.length}</h3>
          </div>
        </div>

        <div className="stat-card">
          <span>📈</span>
          <div>
            <small>Course Progress</small>
            <h3>68%</h3>
          </div>
        </div>

        <div className="stat-card">
          <span>🎓</span>
          <div>
            <small>Certificates</small>
            <h3>1 Verified</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <p>Jump directly into active analytical tasks:</p>
          <div className="quick-actions">
            <button className="quick-action" onClick={() => navigate("/app/python")}>
              🐍 Python Analysis
            </button>
            <button className="quick-action" onClick={() => navigate("/app/dataset")}>
              📂 Inspect Dataset
            </button>
            <button className="quick-action" onClick={() => navigate("/app/cleaning")}>
              🧹 Clean Data
            </button>
            <button className="quick-action" onClick={() => navigate("/app/visualization")}>
              📊 Plot Visualizations
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Pipeline Status</h2>
          <div className="activity">
            <span>📂</span>
            <div>
              <strong>Dataset Loaded</strong>
              <small>
                {selectedFile?.name || "sample_data.csv"} ({datasetRows.length} rows)
              </small>
            </div>
          </div>
          <div className="activity">
            <span>🧹</span>
            <div>
              <strong>Data Quality</strong>
              <small>{activeQuality.completeness}% Completeness Rate</small>
            </div>
          </div>
          <div className="activity">
            <span>🐍</span>
            <div>
              <strong>Python Engine</strong>
              <small>{analysisDone ? "Analysis executed" : "Ready to run"}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
