import { Link, NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", to: "/app/dashboard" },
    { id: "python", label: "Python Analysis", icon: "🐍", to: "/app/python" },
    { id: "dataset", label: "Dataset", icon: "📂", to: "/app/dataset" },
    { id: "cleaning", label: "Data Cleaning", icon: "🧹", to: "/app/cleaning" },
    { id: "visualization", label: "Visualization", icon: "📊", to: "/app/visualization" },
    { id: "ml", label: "Machine Learning", icon: "🤖", to: "/app/ml" },
    { id: "insights", label: "Smart Insights", icon: "✨", to: "/app/insights" },
    { id: "reports", label: "Reports", icon: "📑", to: "/app/reports" },
    { id: "courses", label: "My Courses", icon: "📚", to: "/app/courses" },
    { id: "progress", label: "My Progress", icon: "📈", to: "/app/progress" },
    { id: "certificates", label: "My Certificates", icon: "🎓", to: "/app/certificates" },
    { id: "profile", label: "Profile", icon: "👤", to: "/app/profile" },
    { id: "settings", label: "Settings", icon: "⚙️", to: "/app/settings" }
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand">
        <span>SP</span>
        <div>
          <strong>Smart Python</strong>
          <small>Analysis Studio</small>
        </div>
      </div>

      <Link
        to="/"
        className="back-to-public-btn"
        title="Return to the public portal"
      >
        <span>←</span>
        <span>Public Website</span>
      </Link>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <button className="logout-button" onClick={onLogout}>
        <span>🚪</span>
        <span>Logout</span>
      </button>
    </aside>
  );
}
