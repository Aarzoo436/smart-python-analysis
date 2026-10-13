import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Curriculum Inquiries",
    message: ""
  });
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim() || form.message.trim().length < 8) {
      newErrors.message = "Message must be at least 8 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFeedback({
      type: "success",
      text: "Thank you! Your message has been received by the Smart Python Analysis team. We will respond within 24 hours."
    });
    setForm({
      name: "",
      email: "",
      subject: "Curriculum Inquiries",
      message: ""
    });
  };

  return (
    <section className="page">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Have questions about our curriculum, certification registry, or platform features? Get in touch with our team.
      </p>

      <div className="contact-layout">
        {/* CONTACT INFO */}
        <div className="contact-info-cards">
          <div className="contact-card">
            <h3 style={{ color: "#67eadb", marginBottom: "8px" }}>📧 Academic Support</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
              support@smartpythonanalysis.com
            </p>
            <small style={{ color: "#8d98b0" }}>Response time: within 24 hours</small>
          </div>

          <div className="contact-card">
            <h3 style={{ color: "#67eadb", marginBottom: "8px" }}>🎓 Certification Desk</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
              verify@smartpythonanalysis.com
            </p>
            <small style={{ color: "#8d98b0" }}>For credential & badge inquiries</small>
          </div>

          <div className="contact-card">
            <h3 style={{ color: "#67eadb", marginBottom: "8px" }}>📍 Academy Headquarters</h3>
            <p style={{ color: "#cbd5e1", fontSize: "14px" }}>
              Smart Python Analysis Platform
            </p>
            <small style={{ color: "#8d98b0" }}>Online Global Learning Community</small>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="contact-form">
          {feedback && (
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "10px",
                background: "rgba(34, 197, 94, 0.15)",
                border: "1px solid #22c55e",
                color: "#4ade80",
                marginBottom: "20px",
                fontSize: "14px"
              }}
            >
              ✓ {feedback.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label>Inquiry Subject</label>
              <select
                className="form-control"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                style={{ background: "#0b1120" }}
              >
                <option value="Curriculum Inquiries">Course Curriculum Query</option>
                <option value="Certificate Inquiries">Certificate Verification Support</option>
                <option value="Technical Support">Platform Technical Question</option>
                <option value="Partnerships">Enterprise & University Partnerships</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                className="form-control"
                placeholder="Write your message here..."
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <div className="form-error">{errors.message}</div>}
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px" }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
