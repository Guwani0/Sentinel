import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ReportSuccessPage() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const incidentId = location.state?.incidentId || "INC-20250923-67247";
  // ✅ CHANGED: get submission time from navigate state or fallback to now
const submittedAt = location.state?.submittedAt || new Date().toISOString();


  const handleCopy = () => {
    navigator.clipboard.writeText(incidentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ NEW: color palette
  const COLORS = {
    mainPurple: "#711bb5",
    neonGradientStart: "#b76bff",
    neonGradientEnd: "#ff4dff",
    darkBase: "#000",
    cardStart: "#111",
    cardEnd: "#3a0044",
    text: "#fff"
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif", background: `linear-gradient(135deg, ${COLORS.darkBase}, ${COLORS.cardEnd})`, position: "relative", color: COLORS.text }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)", zIndex: 0 }} />
      <main style={{ position: "relative", zIndex: 1, padding: "28px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 18 }}>
          <img src={logo} alt="Sentinel" style={{ height: 58 }} />
          <h1 style={{ margin: 0, fontSize: 30 }}><span style={{ color: COLORS.mainPurple }}>Incident Reporting</span> Portal</h1>
        </div>
        <div style={{ padding: 24, borderRadius: 12,  background: `linear-gradient(90deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 6px 20px rgba(0,0,0,0.6)", maxWidth: 600, width: "100%", textAlign: "center" }}>
          <h2 style={{ marginTop: 0 }}>Your report has been submitted</h2>
          <p>Incident ID: <strong>{incidentId}</strong>{" "}
            <button onClick={handleCopy} style={{ marginLeft: 8, padding: "4px 10px", borderRadius: 6, border: "none", background: copied ? "green" : COLORS.mainPurple, color: COLORS.text, cursor: "pointer" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </p>
          <p>Submitted at: {new Date(submittedAt).toLocaleString()}</p>
          <p style={{ opacity: 0.9, marginBottom: 20 }}>A security analyst will review this and contact you if more information is required.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
            <button style={buttonStyle} onClick={() => navigate("/incident")}>Submit Another Report</button>
            <button style={buttonStyle} onClick={() => navigate("/incident", { state: { formData: location.state?.formData || {} } })}>Edit Your Report</button>
            <button style={buttonStyle} onClick={() => navigate("/")}>Go to Profile</button>
          </div>
        </div>
      </main>
      <footer style={{ textAlign: "center", padding: 18, background: COLORS.darkBase, opacity: 0.9, marginTop: 30, color: COLORS.text }}>
        <p style={{ margin: 0 }}>© 2025 Sentinel | Sri Lanka Army IT Department</p>
      </footer>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        button {
          transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;
        }
        button:hover {
          box-shadow: 0 0 15px #711bb5, 0 0 30px #711bb5, 0 0 45px #711bb5;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

const buttonStyle = {
  width: "200px",
  padding: "8px 12px",
  borderRadius: 10,
  border: "none",
  background: "#711bb5",
  color: "#fff",
  fontSize: 14,
  fontFamily: "Poppins",
  cursor: "pointer",
  transition: "box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out",
  margin: "0 auto"  // centers the button horizontally
};

