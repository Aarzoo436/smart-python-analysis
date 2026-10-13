import { useNavigate } from "react-router-dom";

export default function CoursesPage({ selectedCourseTab, setSelectedCourseTab, onVerifyPreset }) {
  const navigate = useNavigate();

  return (
    <section className="page">
      <h1 className="page-title">Course Details & Curriculum</h1>
      <p className="page-subtitle">
        Comprehensive certification tracks designed for practical data science mastery.
        Explore the detailed modules, learning outcomes, and prerequisites for each program below.
      </p>

      {/* COURSE TABS NAVIGATION (5 Courses) */}
      <div className="course-tabs-nav">
        <button
          className={`course-tab-btn ${selectedCourseTab === "python" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("python")}
        >
          🐍 Python for Data Analysis
        </button>
        <button
          className={`course-tab-btn ${selectedCourseTab === "analysis" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("analysis")}
        >
          📊 Data Analysis & Exploration
        </button>
        <button
          className={`course-tab-btn ${selectedCourseTab === "cleaning" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("cleaning")}
        >
          🧹 Data Cleaning Studio
        </button>
        <button
          className={`course-tab-btn ${selectedCourseTab === "visualization" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("visualization")}
        >
          📈 Data Visualization Studio
        </button>
        <button
          className={`course-tab-btn ${selectedCourseTab === "ml" ? "active" : ""}`}
          onClick={() => setSelectedCourseTab("ml")}
        >
          🤖 Practical Machine Learning
        </button>
      </div>

      {/* TAB 1: PYTHON FOR DATA ANALYSIS */}
      {selectedCourseTab === "python" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(0, 212, 255, 0.15)", color: "#00d4ff" }}>
              CORE TRACK • 8 WEEKS • 48 HOURS
            </span>
            <span style={{ color: "#f59e0b", fontSize: "14px" }}>★★★★★ 4.9/5 (1,200+ Students)</span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Python for Data Analysis
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            Master tabular data manipulation, statistical computation, dataset profiling, and real-world analytics
            using Python, NumPy, and Pandas. Build interactive scripts from scratch and analyze complex tables.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Python Programming Fundamentals, Data Types & Control Structures</li>
            <li><strong>Module 2:</strong> NumPy Arrays, Matrix Operations & Vectorized Computing</li>
            <li><strong>Module 3:</strong> Pandas DataFrames: Ingestion, Slicing, GroupBy & Filtering</li>
            <li><strong>Module 4:</strong> Statistical Profiling: Means, Medians, Variance & Standard Deviation</li>
            <li><strong>Module 5:</strong> Capstone Case Study & Verified Certificate (SPA-2026-001)</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onVerifyPreset("SPA-2026-001")}
            >
              View Sample Certificate (SPA-2026-001)
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: DATA ANALYSIS & EXPLORATION */}
      {selectedCourseTab === "analysis" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(103, 234, 219, 0.15)", color: "#67eadb" }}>
              ANALYST TRACK • 6 WEEKS • 36 HOURS
            </span>
            <span style={{ color: "#f59e0b", fontSize: "14px" }}>★★★★★ 4.8/5 (950+ Students)</span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Data Analysis & Exploration (EDA)
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            Learn how to approach any raw CSV file and uncover business patterns, correlation insights,
            cohort distributions, and key drivers of performance.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Exploratory Data Analysis (EDA) Methodology</li>
            <li><strong>Module 2:</strong> Univariate and Bivariate Distribution Analysis</li>
            <li><strong>Module 3:</strong> Outlier Detection & Anomaly Spotting</li>
            <li><strong>Module 4:</strong> Cross-tabulation, Pivot Tables & Aggregations</li>
            <li><strong>Module 5:</strong> Executive Data Storytelling and Insights Synthesis</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: DATA CLEANING STUDIO */}
      {selectedCourseTab === "cleaning" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
              ENGINEERING TRACK • 4 WEEKS • 24 HOURS
            </span>
            <span style={{ color: "#f59e0b", fontSize: "14px" }}>★★★★★ 4.9/5 (720+ Students)</span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Data Cleaning & Preprocessing Studio
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            80% of data science is data preparation. Master automated duplicate filtering, null value
            imputation strategies (mean, median, mode), schema casting, and data validation rules.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Assessing Data Quality & Completeness Rates</li>
            <li><strong>Module 2:</strong> Duplicate Detection & De-duplication Algorithms</li>
            <li><strong>Module 3:</strong> Missing Data Strategies: Drop vs Impute</li>
            <li><strong>Module 4:</strong> Schema Normalization & String Sanitization</li>
            <li><strong>Module 5:</strong> Preprocessing Certification Lab (SPA-2026-004)</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onVerifyPreset("SPA-2026-004")}
            >
              View Sample Certificate (SPA-2026-004)
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: DATA VISUALIZATION STUDIO */}
      {selectedCourseTab === "visualization" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(124, 92, 255, 0.15)", color: "#c084fc" }}>
              SPECIALIZATION • 6 WEEKS • 36 HOURS
            </span>
            <span style={{ color: "#f59e0b", fontSize: "14px" }}>★★★★★ 4.8/5 (850+ Students)</span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Data Visualization Studio
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            Transform static tables into interactive charts. Master comparative bar charts, continuous
            trend line plots, and proportional conic-gradient pie distributions.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Principles of Visual Perception & Color Harmony</li>
            <li><strong>Module 2:</strong> Categorical Comparison with Bar and Column Charts</li>
            <li><strong>Module 3:</strong> Time-Series & Continuous Trend Line Graphs</li>
            <li><strong>Module 4:</strong> Proportional Distribution with Pie & Radial Charts</li>
            <li><strong>Module 5:</strong> Designing Decision-Maker Analytics Dashboards (SPA-2026-002)</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onVerifyPreset("SPA-2026-002")}
            >
              View Sample Certificate (SPA-2026-002)
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: PRACTICAL MACHINE LEARNING */}
      {selectedCourseTab === "ml" && (
        <div className="course-detail-box">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <span className="badge-tag" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
              ADVANCED TRACK • 10 WEEKS • 60 HOURS
            </span>
            <span style={{ color: "#f59e0b", fontSize: "14px" }}>★★★★★ 4.9/5 (920+ Students)</span>
          </div>

          <h2 style={{ fontSize: "28px", color: "#ffffff", marginBottom: "12px" }}>
            Practical Machine Learning
          </h2>
          <p style={{ color: "#cbd5e1", lineHeight: "1.8", fontSize: "15px" }}>
            Build predictive models, evaluate classification accuracy, and implement supervised learning
            workflows on tabular data using gradient descent regressor models.
          </p>

          <ul className="syllabus-list">
            <li><strong>Module 1:</strong> Supervised vs Unsupervised ML Foundations</li>
            <li><strong>Module 2:</strong> Feature Selection, Data Normalization & Imputation</li>
            <li><strong>Module 3:</strong> Linear and Logistic Regression Algorithms</li>
            <li><strong>Module 4:</strong> Model Evaluation: Mean Squared Error, R², Precision & Recall</li>
            <li><strong>Module 5:</strong> Capstone Prediction Engine Lab (SPA-2026-003)</li>
          </ul>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "24px" }}>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Enroll in this Course →
            </button>
            <button
              className="btn-secondary"
              onClick={() => onVerifyPreset("SPA-2026-003")}
            >
              View Sample Certificate (SPA-2026-003)
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
