import { useNavigate } from "react-router-dom";

export default function CoursesAppPage() {
  const navigate = useNavigate();

  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>📚</span>
        <div>
          <p>CURRICULUM</p>
          <h2>My Enrolled Courses</h2>
          <p>Continue your learning journey across active data science courses.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Python for Data Analysis</h2>
        <p style={{ color: "#8d96aa" }}>Hands-on modules covering NumPy, Pandas, Data Cleaning, and EDA.</p>
        <div className="progress-bar" style={{ margin: "20px 0" }}>
          <div className="progress-fill" style={{ width: "68%" }} />
        </div>
        <p style={{ color: "#67eadb", fontWeight: "600" }}>Progress: 68% (12 of 18 Modules Finished)</p>
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/app/python")}>Continue Learning →</button>
        </div>
      </div>
    </section>
  );
}
