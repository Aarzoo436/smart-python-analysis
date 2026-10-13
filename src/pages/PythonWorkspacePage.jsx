import { useNavigate } from "react-router-dom";

export default function PythonWorkspacePage({
  selectedFile,
  datasetRows,
  datasetHeaders,
  pythonCode,
  setPythonCode,
  analysisDone,
  analysisResult,
  runAnalysis
}) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🐍</span>
        <div>
          <p>INTERACTIVE PYTHON WORKSPACE</p>
          <h2>Python Data Analysis</h2>
          <p>
            Write, inspect, and execute Python data analysis code to extract
            statistical properties and data summaries.
          </p>
        </div>
      </div>

      <div className="workspace-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px"
          }}
        >
          <div>
            <h2>Python Analysis Workspace</h2>
            <p style={{ color: "#8d96aa" }}>
              Target Dataset: <strong>{selectedFile?.name || "Dataset"}</strong> (
              {datasetRows.length} records, {datasetHeaders.length} columns)
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={runAnalysis}>
              ▶ Run Python Analysis
            </button>
          </div>
        </div>

        {/* CODE PRESET SHORTCUTS */}
        <div style={{ marginBottom: "15px" }}>
          <small style={{ color: "#8d96aa", marginRight: "10px" }}>Load Script Preset:</small>
          <button
            style={{ padding: "5px 12px", fontSize: "12px", marginRight: "8px", background: "#1a2234", color: "#67eadb" }}
            onClick={() =>
              setPythonCode(
`import pandas as pd
df = pd.read_csv("${selectedFile?.name || "data.csv"}")
print("Statistical Summary:")
print(df.describe())`
              )
            }
          >
            Descriptive Stats
          </button>
          <button
            style={{ padding: "5px 12px", fontSize: "12px", marginRight: "8px", background: "#1a2234", color: "#67eadb" }}
            onClick={() =>
              setPythonCode(
`import pandas as pd
df = pd.read_csv("${selectedFile?.name || "data.csv"}")
print("Highest Performer Record:")
print(df.sort_values(by=df.columns[2], ascending=False).head(1))`
              )
            }
          >
            Top Performer
          </button>
          <button
            style={{ padding: "5px 12px", fontSize: "12px", background: "#1a2234", color: "#67eadb" }}
            onClick={() =>
              setPythonCode(
`import pandas as pd
df = pd.read_csv("${selectedFile?.name || "data.csv"}")
print("Missing Value Audit:")
print(df.isnull().sum())`
              )
            }
          >
            Check Nulls
          </button>
        </div>

        {/* CODE EDITOR */}
        <textarea
          value={pythonCode}
          onChange={(e) => setPythonCode(e.target.value)}
          style={{
            width: "100%",
            minHeight: "180px",
            background: "#080c16",
            color: "#67eadb",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            lineHeight: "1.6"
          }}
        />

        {/* ANALYSIS RESULTS */}
        {analysisDone && analysisResult && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              borderRadius: "14px",
              background: "#0d1424",
              border: "1px solid rgba(103,234,219,0.3)"
            }}
          >
            <h3 style={{ color: "#67eadb", marginBottom: "14px" }}>
              ✓ Execution Output & Statistical Summary
            </h3>

            <div className="stats-grid" style={{ marginBottom: "16px" }}>
              <div className="stat-card">
                <span>📊</span>
                <div>
                  <small>Average {analysisResult.marksColumn}</small>
                  <h3>{analysisResult.average}</h3>
                </div>
              </div>
              <div className="stat-card">
                <span>🏆</span>
                <div>
                  <small>Highest Score</small>
                  <h3>{analysisResult.highest}</h3>
                </div>
              </div>
              <div className="stat-card">
                <span>📉</span>
                <div>
                  <small>Lowest Score</small>
                  <h3>{analysisResult.lowest}</h3>
                </div>
              </div>
              <div className="stat-card">
                <span>🌟</span>
                <div>
                  <small>Top Ranker</small>
                  <h3>{analysisResult.topStudent}</h3>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              <button onClick={() => navigate("/app/visualization")}>
                View Visual Charts →
              </button>
              <button
                style={{ background: "#1f293d", color: "#cbd5e1" }}
                onClick={() => navigate("/app/reports")}
              >
                Generate Audit Report
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
