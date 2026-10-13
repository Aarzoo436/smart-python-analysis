import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span>SP</span>
        Smart Python Analysis
      </Link>

      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")}>
          Course Details
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
          Contact
        </NavLink>
        <NavLink to="/verify" className={({ isActive }) => (isActive ? "active" : "")}>
          Certificate Verification
        </NavLink>
      </nav>

      <div className="auth-buttons">
        {currentUser ? (
          <>
            <button className="btn-primary" onClick={() => navigate("/app/dashboard")}>
              Go to Workspace →
            </button>
            <button className="btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-secondary" style={{ display: "inline-block", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/register" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
