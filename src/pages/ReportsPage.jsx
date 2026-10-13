export default function ReportsPage({
  selectedFile,
  datasetRows,
  datasetHeaders,
  analysisResult,
  activeQuality
}) {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📑</span>
        <div>
          <p>EXECUTIVE DATA SUMMARY</p>
          <h2>Analysis Reports</h2>
          <p>Comprehensive printable reports covering data audit and analysis.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Executive Summary Report</h2>
        <p style={{ color: "#8d96aa" }}>
          Generated on {new Date().toLocaleDateString()} by Smart Python Analysis
        </p>

        <div style={{ background: "#0d1322", border: "1px solid #1e293b", borderRadius: "14px", padding: "24px", marginTop: "20px", lineHeight: "1.8" }}>
          <h3 style={{ color: "#00d4ff", marginBottom: "10px" }}>Dataset & Analysis Summary</h3>
          <p style={{ color: "#cbd5e1" }}>
            • <strong>Active File:</strong> {selectedFile?.name || "sample_data.csv"}<br />
            • <strong>Records Audited:</strong> {datasetRows.length}<br />
            • <strong>Features Identified:</strong> {datasetHeaders.join(", ")}<br />
            • <strong>Cohort Mean:</strong> {analysisResult?.average || "87.60"}<br />
            • <strong>Top Ranker:</strong> {analysisResult?.topStudent || "Neha"} ({analysisResult?.highest || "95"} Marks)<br />
            • <strong>Data Quality Rating:</strong> {activeQuality.completeness}%
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => window.print()}>
            🖨️ Print / Save Report PDF
          </button>
        </div>
      </div>
    </section>
  );
}
