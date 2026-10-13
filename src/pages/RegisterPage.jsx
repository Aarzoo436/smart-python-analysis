import { Link } from "react-router-dom";

export default function RegisterPage({
  registerForm,
  setRegisterForm,
  registerError,
  onSubmit
}) {
  return (
    <section className="page" style={{ minHeight: "65vh" }}>
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Student Account</h1>
          <p>Register to unlock datasets, Python tools, and course certifications.</p>
        </div>

        {/* BACKEND STATUS NOTICE */}
        <div className="alert-box alert-info" style={{ fontSize: "12px", lineHeight: "1.5" }}>
          <strong>ℹ️ Registration Store:</strong> Newly registered accounts are stored in your secure client database.
          In production, this connects to <code>POST /api/auth/register</code> backed by a database.
        </div>

        {registerError && <div className="alert-box alert-error">{registerError}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Alex Morgan"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              className="form-control"
              placeholder="alex@example.com"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password (Min. 6 Characters) *</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            Create Account & Enter Workspace →
          </button>
        </form>

        <p style={{ marginTop: "22px", textAlign: "center", color: "#8d98b0", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#67eadb", fontWeight: "700", textDecoration: "none" }}
          >
            Log in here
          </Link>
        </p>
      </div>
    </section>
  );
}
