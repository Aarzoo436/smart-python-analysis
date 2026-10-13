import { useNavigate } from "react-router-dom";

export default function CleaningPage({
  datasetRows,
  activeQuality,
  cleaningDone,
  cleaningMessage,
  beforeStats,
  removeDuplicates,
  fillMissingValues,
  removeRowsWithMissing,
  resetToOriginal
}) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🧹</span>
        <div>
          <p>DATA HYGIENE ENGINE</p>
          <h2>Data Cleaning Studio</h2>
          <p>
            Detect duplicates, drop damaged rows, impute missing values with column
            means, and restore original data.
          </p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Data Quality Audit & Remediation</h2>
        <p style={{ color: "#8d96aa", marginBottom: "20px" }}>
          Current Records: <strong>{datasetRows.length}</strong> | Completeness:{" "}
          <strong>{activeQuality.completeness}%</strong> | Missing Values:{" "}
          <strong>{activeQuality.totalMissing}</strong> | Duplicate Rows:{" "}
          <strong>{activeQuality.duplicateRowsCount}</strong>
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "25px" }}>
          <button onClick={removeDuplicates}>
            ✂ Remove Duplicate Rows
          </button>
          <button
            style={{ background: "#1f293d", color: "#67eadb" }}
            onClick={fillMissingValues}
          >
            🩹 Impute Missing with Mean
          </button>
          <button
            style={{ background: "#2e1a24", color: "#ff7b8a" }}
            onClick={removeRowsWithMissing}
          >
            🗑 Drop Rows with Missing
          </button>
          <button
            style={{ background: "#1c2538", color: "#cbd5e1" }}
            onClick={resetToOriginal}
          >
            ↺ Reset to Original
          </button>
        </div>

        {cleaningDone && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(34, 197, 94, 0.12)",
              border: "1px solid rgba(34, 197, 94, 0.35)",
              color: "#4ade80",
              marginBottom: "20px",
              fontSize: "14px"
            }}
          >
            ✓ {cleaningMessage}
          </div>
        )}

        {beforeStats && (
          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background: "#0c1322",
              border: "1px solid #1e293b",
              marginBottom: "20px"
            }}
          >
            <h3 style={{ color: "#67eadb", marginBottom: "10px" }}>
              📊 Before vs. After Cleaning Comparison
            </h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.8" }}>
              • <strong>Row Count:</strong> {beforeStats.rows} rows originally →{" "}
              <span style={{ color: "#22c55e" }}>{datasetRows.length} rows now</span>
              <br />
              • <strong>Missing Cells:</strong> {beforeStats.missing} originally →{" "}
              <span style={{ color: "#22c55e" }}>{activeQuality.totalMissing} now</span>
              <br />
              • <strong>Completeness:</strong> {beforeStats.completeness}% originally →{" "}
              <span style={{ color: "#22c55e" }}>{activeQuality.completeness}% now</span>
            </p>
          </div>
        )}

        <div style={{ marginTop: "15px" }}>
          <button onClick={() => navigate("/app/python")}>
            Run Python Analysis on Cleaned Data →
          </button>
        </div>
      </div>
    </section>
  );
}
