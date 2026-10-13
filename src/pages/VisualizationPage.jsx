export default function VisualizationPage({
  datasetRows,
  datasetHeaders,
  activeMarksColIndex,
  chartType,
  setChartType
}) {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📊</span>
        <div>
          <p>INTERACTIVE PLOTS</p>
          <h2>Data Visualization Studio</h2>
          <p>
            Render comparative bar charts, line progression curves, and proportional
            distribution pie charts directly from your dataset.
          </p>
        </div>
      </div>

      <div className="workspace-card">
        {/* CHART TYPE SELECTOR */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "25px" }}>
          <button
            style={{
              background: chartType === "bar" ? "linear-gradient(90deg, #00d4ff, #7c3aed)" : "rgba(255,255,255,0.06)",
              color: chartType === "bar" ? "#ffffff" : "#aeb6c8"
            }}
            onClick={() => setChartType("bar")}
          >
            📊 Bar Chart
          </button>

          <button
            style={{
              background: chartType === "line" ? "linear-gradient(90deg, #00d4ff, #7c3aed)" : "rgba(255,255,255,0.06)",
              color: chartType === "line" ? "#ffffff" : "#aeb6c8"
            }}
            onClick={() => setChartType("line")}
          >
            📈 Line Chart
          </button>

          <button
            style={{
              background: chartType === "pie" ? "linear-gradient(90deg, #00d4ff, #7c3aed)" : "rgba(255,255,255,0.06)",
              color: chartType === "pie" ? "#ffffff" : "#aeb6c8"
            }}
            onClick={() => setChartType("pie")}
          >
            🥧 Pie Chart
          </button>
        </div>

        {/* 1. BAR CHART */}
        {chartType === "bar" && datasetRows.length > 0 && (
          <div>
            <h3 style={{ color: "#67eadb", marginBottom: "6px" }}>
              📊 Bar Chart Comparison ({datasetHeaders[activeMarksColIndex] || "Score"})
            </h3>
            <p style={{ color: "#8d96aa", marginBottom: "20px" }}>
              Comparative scores by student / record
            </p>

            <div>
              {datasetRows.map((row, index) => {
                const val = Number(row[activeMarksColIndex]) || 0;
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "14px"
                    }}
                  >
                    <span style={{ width: "100px", color: "#b8c0d0", fontSize: "14px" }}>
                      {row[0]}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "24px",
                        background: "#1a2233",
                        borderRadius: "20px",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(100, Math.max(0, val))}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                          borderRadius: "20px"
                        }}
                      />
                    </div>
                    <strong style={{ width: "50px", textAlign: "right", color: "#00d4ff" }}>
                      {val}
                    </strong>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. LINE CHART */}
        {chartType === "line" && datasetRows.length > 0 && (
          <div>
            <h3 style={{ color: "#67eadb", marginBottom: "6px" }}>
              📈 Line Chart Progression
            </h3>
            <p style={{ color: "#8d96aa", marginBottom: "20px" }}>
              Curve progression across dataset records
            </p>

            <div
              style={{
                height: "240px",
                position: "relative",
                borderLeft: "1px solid #394154",
                borderBottom: "1px solid #394154",
                padding: "15px"
              }}
            >
              <svg viewBox="0 0 600 220" width="100%" height="220" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="4"
                  points={datasetRows
                    .map((row, index, arr) => {
                      const marks = Number(row[activeMarksColIndex]) || 0;
                      const x = arr.length === 1 ? 300 : (index / (arr.length - 1)) * 560 + 20;
                      const y = 210 - marks * 1.8;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
                {datasetRows.map((row, index, arr) => {
                  const marks = Number(row[activeMarksColIndex]) || 0;
                  const x = arr.length === 1 ? 300 : (index / (arr.length - 1)) * 560 + 20;
                  const y = 210 - marks * 1.8;
                  return <circle key={index} cx={x} cy={y} r="6" fill="#7c3aed" />;
                })}
              </svg>
            </div>
          </div>
        )}

        {/* 3. PIE CHART */}
        {chartType === "pie" && datasetRows.length > 0 && (
          <div>
            <h3 style={{ color: "#67eadb", marginBottom: "6px" }}>
              🥧 Proportional Distribution
            </h3>
            <p style={{ color: "#8d96aa", marginBottom: "20px" }}>
              Relative proportion across entities
            </p>

            {(() => {
              const data = datasetRows.map((row) => ({
                name: row[0],
                value: Number(row[activeMarksColIndex]) || 0
              }));
              const total = data.reduce((sum, item) => sum + item.value, 0);
              const colors = ["#00d4ff", "#7c3aed", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6"];

              let angle = 0;
              const gradient = data
                .map((item, index) => {
                  const start = angle;
                  angle += total > 0 ? (item.value / total) * 360 : 0;
                  return `${colors[index % colors.length]} ${start}deg ${angle}deg`;
                })
                .join(", ");

              return (
                <div style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      background: total > 0 ? `conic-gradient(${gradient})` : "#263044"
                    }}
                  />
                  <div>
                    {data.map((item, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            background: colors[index % colors.length],
                            display: "inline-block"
                          }}
                        />
                        <span style={{ color: "#d7dbea" }}>{item.name}</span>
                        <strong style={{ color: "#00d4ff" }}>{item.value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}
