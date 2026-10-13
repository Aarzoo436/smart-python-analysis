import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h3>Smart Python Analysis</h3>
        <p>
          The dedicated in-browser learning and execution environment for Python,
          data profiling, tabular cleaning, interactive visualizations, and machine learning.
        </p>
        <small style={{ color: "#64748b", display: "block", marginTop: "12px" }}>
          © {new Date().getFullYear()} Smart Python Analysis (SPA). All rights reserved.
        </small>
      </div>

      <div>
        <h4>Curriculum & Verification</h4>
        <p><Link to="/courses">Course Details & Syllabus</Link></p>
        <p><Link to="/verify">Official Certificate Verification</Link></p>
        <p><Link to="/about">About SPA Academy</Link></p>
      </div>

      <div>
        <h4>Support & Account</h4>
        <p><Link to="/contact">Contact Support</Link></p>
        <p><Link to="/login">Login to Workspace</Link></p>
        <p><Link to="/register">Register New Account</Link></p>
      </div>
    </footer>
  );
}
