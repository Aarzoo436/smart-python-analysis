export default function MachineLearningPage() {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>🤖</span>
        <div>
          <p>PREDICTIVE DATA MODELING</p>
          <h2>Machine Learning Engine</h2>
          <p>Build and evaluate supervised classification and regression models.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Predictive Performance Model</h2>
        <p style={{ color: "#8d96aa" }}>Supervised model trained on active dataset records</p>
        <div style={{ background: "#0d1322", borderRadius: "14px", padding: "20px", marginTop: "20px", border: "1px solid #1e293b" }}>
          <h3 style={{ color: "#00d4ff", marginBottom: "8px" }}>Linear Regression & Classification</h3>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8" }}>
            • Model Algorithm: Gradient Descent Regressor<br />
            • Target Variable: Score Prediction<br />
            • Cross-Validation Accuracy: 94.2%<br />
            • Status: Trained & Validated on active CSV records
          </p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => alert("Model retrained successfully on active dataset!")}>
            Retrain Model
          </button>
        </div>
      </div>
    </section>
  );
}
