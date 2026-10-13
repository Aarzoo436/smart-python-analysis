export default function DatasetPage({
  selectedFile,
  datasetRows,
  datasetHeaders,
  activeQuality,
  columnTypes,
  filteredPreviewRows,
  datasetSearchTerm,
  setDatasetSearchTerm,
  handleFileUpload,
  loadSampleDataset,
  loadDirtyDataset
}) {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📂</span>
        <div>
          <p>TABULAR DATA PROFILING</p>
          <h2>Dataset Management</h2>
          <p>
            Upload and profile custom CSV datasets, inspect data types, identify missing
            values, and view summary metrics.
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
            gap: "15px",
            marginBottom: "20px"
          }}
        >
          <div>
            <h2>Active Dataset: {selectedFile?.name || "dataset.csv"}</h2>
            <p style={{ color: "#8d96aa" }}>
              {datasetRows.length} total records • {datasetHeaders.length} columns •{" "}
              {activeQuality.completeness}% completeness rating
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <label
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #67eadb, #4f46e5)",
                color: "#07121e",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-block"
              }}
            >
              📁 Upload CSV File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>

            <button
              style={{ background: "#1a2438", color: "#67eadb" }}
              onClick={loadSampleDataset}
            >
              Load Clean Sample
            </button>
            <button
              style={{ background: "#1a2438", color: "#f59e0b" }}
              onClick={loadDirtyDataset}
            >
              Load Sample With Issues
            </button>
          </div>
        </div>

        {/* QUALITY KPI CARDS */}
        <div className="stats-grid" style={{ marginBottom: "25px" }}>
          <div className="stat-card">
            <span>📋</span>
            <div>
              <small>Rows</small>
              <h3>{datasetRows.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <span>🏷️</span>
            <div>
              <small>Columns</small>
              <h3>{datasetHeaders.length}</h3>
            </div>
          </div>
          <div className="stat-card">
            <span>⚠️</span>
            <div>
              <small>Missing Cells</small>
              <h3 style={{ color: activeQuality.totalMissing > 0 ? "#f59e0b" : "#22c55e" }}>
                {activeQuality.totalMissing}
              </h3>
            </div>
          </div>
          <div className="stat-card">
            <span>📑</span>
            <div>
              <small>Duplicate Rows</small>
              <h3 style={{ color: activeQuality.duplicateRowsCount > 0 ? "#ff7b8a" : "#22c55e" }}>
                {activeQuality.duplicateRowsCount}
              </h3>
            </div>
          </div>
        </div>

        {/* COLUMN PROFILING TABLE */}
        <h3 style={{ marginBottom: "12px", color: "#67eadb" }}>🔍 Column Types & Profiling</h3>
        <div style={{ overflowX: "auto", marginBottom: "30px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#12192c" }}>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>#</th>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>Column Name</th>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>Detected Type</th>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>Missing Count</th>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>Missing %</th>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff", textAlign: "left" }}>Summary Metric</th>
              </tr>
            </thead>
            <tbody>
              {columnTypes.map((col, idx) => (
                <tr key={idx}>
                  <td style={{ padding: "10px", border: "1px solid #263044", color: "#8d96aa" }}>{idx + 1}</td>
                  <td style={{ padding: "10px", border: "1px solid #263044", fontWeight: "bold", color: "#f8fafc" }}>{col.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #263044", color: "#67eadb" }}>{col.type}</td>
                  <td style={{ padding: "10px", border: "1px solid #263044", color: col.missingCount > 0 ? "#f59e0b" : "#cbd5e1" }}>
                    {col.missingCount}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #263044", color: "#cbd5e1" }}>{col.missingPct}%</td>
                  <td style={{ padding: "10px", border: "1px solid #263044", color: "#a5b4fc" }}>
                    {col.stats ? `Mean: ${col.stats.mean} | Min: ${col.stats.min} | Max: ${col.stats.max}` : "Categorical feature"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SEARCHABLE DATASET TABLE */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
          <h3 style={{ color: "#67eadb" }}>📋 Tabular Data Preview</h3>
          <input
            type="text"
            placeholder="Search records..."
            value={datasetSearchTerm}
            onChange={(e) => setDatasetSearchTerm(e.target.value)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              background: "#090e1c",
              border: "1px solid #263044",
              color: "#fff",
              fontSize: "13px"
            }}
          />
        </div>

        <div style={{ overflowX: "auto", maxHeight: "350px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#141c2e", position: "sticky", top: 0 }}>
                <th style={{ padding: "10px", border: "1px solid #263044", color: "#00d4ff" }}>#</th>
                {datasetHeaders.map((h, i) => (
                  <th key={i} style={{ padding: "10px", border: "1px solid #263044", color: "#67eadb", textAlign: "left" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPreviewRows.map((row, rIdx) => (
                <tr key={rIdx} style={{ background: rIdx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <td style={{ padding: "9px 12px", border: "1px solid #263044", color: "#8d96aa" }}>{rIdx + 1}</td>
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      style={{
                        padding: "9px 12px",
                        border: "1px solid #263044",
                        color: cell === "" || cell === "N/A" ? "#f59e0b" : "#e2e8f0"
                      }}
                    >
                      {cell === "" ? "<Missing>" : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
