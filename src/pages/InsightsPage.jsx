import { useNavigate } from "react-router-dom";

export default function InsightsPage({ analysisResult, activeQuality }) {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>✨</span>
        <div>
          <p>AUTOMATED KNOWLEDGE SYNTHESIS</p>
          <h2>Smart Insights</h2>
          <p>Statistical summaries and automated pattern discovery from your data.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Synthesized Findings</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "20px" }}>
          <div style={{ background: "#0d1322", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
            <h3 style={{ color: "#00d4ff", marginBottom: "8px" }}>📈 Cohort Performance</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              Average performance is {analysisResult?.average || "87.60"}. Score spread ranges from{" "}
              {analysisResult?.lowest || "78"} to {analysisResult?.highest || "95"}.
            </p>
          </div>

          <div style={{ background: "#0d1322", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
            <h3 style={{ color: "#c084fc", marginBottom: "8px" }}>🏆 Top Achiever</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              Top performer is {analysisResult?.topStudent || "Neha"} with a maximum score of{" "}
              {analysisResult?.highest || "95"}.
            </p>
          </div>

          <div style={{ background: "#0d1322", border: "1px solid #1e293b", borderRadius: "14px", padding: "20px" }}>
            <h3 style={{ color: "#22c55e", marginBottom: "8px" }}>🛡️ Data Completeness</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              Dataset has {activeQuality.completeness}% completeness rating with{" "}
              {activeQuality.totalMissing} missing values.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "25px" }}>
          <button onClick={() => navigate("/app/reports")}>
            View Full Reports →
          </button>
        </div>
      </div>
    </section>
  );
}
