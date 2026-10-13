import { Link } from "react-router-dom";

export default function LoginPage({
  loginForm,
  setLoginForm,
  loginError,
  authNotice,
  onSubmit
}) {
  return (
    <section className="page" style={{ minHeight: "65vh" }}>
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your interactive data analytics workspace.</p>
        </div>

        {/* BACKEND STATUS NOTICE */}
        <div className="alert-box alert-info" style={{ fontSize: "12px", lineHeight: "1.5" }}>
          <strong>ℹ️ Authentication Engine:</strong> Currently operating in browser-isolated session mode. 
          For production multi-user security, a dedicated backend authentication API (<code>POST /api/auth/login</code>) with JWT/OAuth verification is required.
        </div>

        {authNotice && <div className="alert-box alert-info">{authNotice}</div>}
        {loginError && <div className="alert-box alert-error">{loginError}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="e.g. student@smartpythonanalysis.com"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            Log In to Workspace →
          </button>
        </form>

        {/* DEMO CREDENTIALS QUICK FILLER FOR EVALUATION */}
        <div
          style={{
            marginTop: "20px",
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.15)",
            textAlign: "center"
          }}
        >
          <small style={{ color: "#8d98b0", display: "block", marginBottom: "8px" }}>
            Sample Pre-registered Account:
          </small>
          <button
            type="button"
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              background: "rgba(103, 234, 219, 0.12)",
              color: "#67eadb",
              fontSize: "12px",
              fontWeight: "700"
            }}
            onClick={() => {
              setLoginForm({
                email: "student@smartpythonanalysis.com",
                password: "Password123!"
              });
            }}
          >
            ⚡ Fill Sample Credentials
          </button>
        </div>

        <p style={{ marginTop: "22px", textAlign: "center", color: "#8d98b0", fontSize: "14px" }}>
          Don't have an account yet?{" "}
          <Link
            to="/register"
            style={{ color: "#67eadb", fontWeight: "700", textDecoration: "none" }}
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
}
