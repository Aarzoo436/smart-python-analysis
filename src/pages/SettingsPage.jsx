export default function SettingsPage() {
  return (
    <section className="tool-page">
      <div className="tool-hero">
        <span>⚙️</span>
        <div>
          <p>WORKSPACE PREFERENCES</p>
          <h2>Settings</h2>
          <p>Configure theme preferences, automatic analysis, and data caching.</p>
        </div>
      </div>

      <div className="workspace-card">
        <h2>Preferences</h2>
        <div style={{ marginTop: "20px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", color: "#e2e8f0" }}>
            <input type="checkbox" defaultChecked /> Dark Theme Mode
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", color: "#e2e8f0" }}>
            <input type="checkbox" defaultChecked /> Auto-run Data Profiling upon CSV Upload
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", color: "#e2e8f0" }}>
            <input type="checkbox" defaultChecked /> Persist Pipeline Data Across Tabs & Sessions
          </label>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={() => alert("Preferences saved successfully!")}>
            Save Settings
          </button>
        </div>
      </div>
    </section>
  );
}
