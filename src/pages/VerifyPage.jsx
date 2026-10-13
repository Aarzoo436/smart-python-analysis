export default function VerifyPage({ certificateInput, setCertificateInput, verificationResult, onVerify }) {
  return (
    <section className="page">
      <h1 className="page-title" style={{ textAlign: "center" }}>
        Official Certificate Verification Registry
      </h1>
      <p className="page-subtitle" style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 35px" }}>
        Anyone can verify the authenticity of a Smart Python Analysis credential.
        Enter a Certificate ID below to query our genuine credential records.
      </p>

      {/* VERIFICATION FORM */}
      <div className="verify-box">
        <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: "600", marginBottom: "6px" }}>
          Enter Official Certificate Identifier:
        </label>
        <div className="verify-input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. SPA-2026-001"
            value={certificateInput}
            onChange={(e) => setCertificateInput(e.target.value)}
            style={{ textTransform: "uppercase", letterSpacing: "1px" }}
          />
          <button
            className="btn-primary"
            onClick={() => onVerify()}
            style={{ whiteSpace: "nowrap" }}
          >
            Verify Authenticity
          </button>
        </div>

        {/* QUICK TEST CHIPS */}
        <div className="verify-chips">
          <small style={{ color: "#8d98b0" }}>Quick sample checks:</small>
          <button
            className="chip-btn"
            onClick={() => onVerify("SPA-2026-001")}
          >
            SPA-2026-001 (Valid)
          </button>
          <button
            className="chip-btn"
            onClick={() => onVerify("SPA-2026-002")}
          >
            SPA-2026-002 (Valid)
          </button>
          <button
            className="chip-btn"
            onClick={() => onVerify("SPA-2026-003")}
          >
            SPA-2026-003 (Valid)
          </button>
          <button
            className="chip-btn"
            onClick={() => onVerify("SPA-2026-004")}
          >
            SPA-2026-004 (Valid)
          </button>
          <button
            className="chip-btn"
            style={{ color: "#ff7b8a" }}
            onClick={() => onVerify("SPA-999-FAKE")}
          >
            SPA-999-FAKE (Invalid Test)
          </button>
        </div>
      </div>

      {/* VERIFIED SUCCESS CARD */}
      {verificationResult?.valid && (
        <div className="certificate-card-verified">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
            <h2 style={{ color: "#22c55e", fontSize: "24px", margin: "0" }}>
              ✓ Certificate Officially Verified
            </h2>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                background: "#22c55e",
                color: "#07121e",
                fontWeight: "800",
                fontSize: "12px",
                letterSpacing: "0.5px"
              }}
            >
              STATUS: GENUINE & VALID
            </span>
          </div>

          <p style={{ color: "#cbd5e1", fontSize: "14px", marginBottom: "20px" }}>
            This credential was officially issued by <strong>{verificationResult.data.issuedBy}</strong> and
            is recorded in our authenticated credential ledger.
          </p>

          <div
            style={{
              background: "#0c1524",
              padding: "22px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              lineHeight: "2",
              fontSize: "14px"
            }}
          >
            <div>
              <strong style={{ color: "#8d98b0" }}>Certificate ID:</strong>{" "}
              <span style={{ color: "#00d4ff", fontWeight: "700" }}>{verificationResult.data.id}</span>
            </div>
            <div>
              <strong style={{ color: "#8d98b0" }}>Student Recipient:</strong>{" "}
              <span style={{ color: "#ffffff", fontWeight: "700" }}>{verificationResult.data.student}</span>
            </div>
            <div>
              <strong style={{ color: "#8d98b0" }}>Certified Program:</strong>{" "}
              <span style={{ color: "#ffffff" }}>{verificationResult.data.course}</span>
            </div>
            <div>
              <strong style={{ color: "#8d98b0" }}>Issue Date:</strong>{" "}
              <span style={{ color: "#ffffff" }}>{verificationResult.data.issueDate}</span>
            </div>
            <div>
              <strong style={{ color: "#8d98b0" }}>Performance Honors:</strong>{" "}
              <span style={{ color: "#22c55e", fontWeight: "700" }}>{verificationResult.data.grade}</span>
            </div>
            {verificationResult.data.skills && (
              <div style={{ marginTop: "10px" }}>
                <strong style={{ color: "#8d98b0", display: "block" }}>Verified Competencies:</strong>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                  {verificationResult.data.skills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        background: "rgba(103, 234, 219, 0.12)",
                        color: "#67eadb",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INVALID CERTIFICATE ERROR CARD */}
      {verificationResult?.valid === false && (
        <div className="certificate-card-error">
          <h2 style={{ color: "#ff6b81", fontSize: "22px", marginBottom: "8px" }}>
            ⚠️ Certificate Not Found or Invalid
          </h2>
          <p style={{ color: "#ff94a3", fontSize: "14px", lineHeight: "1.7", maxWidth: "560px", margin: "0 auto" }}>
            The Certificate ID <strong>"{verificationResult.searchedId}"</strong> does not exist in the
            Smart Python Analysis registry. Please check for typographical errors or contact our academic verification desk.
          </p>
        </div>
      )}
    </section>
  );
}
