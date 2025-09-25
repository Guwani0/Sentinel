import React from "react";
import Navbar from "./Components/Navbar";
import logo from "./assets/logo.png"; // make sure logo.png exists in /src/assets/
import { Routes, Route, useNavigate } from "react-router-dom";   // ✅ added useNavigate
import CTDPage1 from "./Pages/CTDPage1";
import CTD from "./Pages/CTD";
import CTDPolicyAck from "./Pages/CTDPolicyAck";
import CTDTraining from "./Pages/CTDTraining";
import CTDIncSevere from "./Pages/CTDIncSevere";
import CTDComTrend from "./Pages/CTDComTrend";
import CTDCstmRpt from "./Pages/CTDCstmRpt";

function App() {
  const navigate = useNavigate(); // ✅ navigation hook

  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="App">
              {/* Hero Section */}
              <header
                className="hero"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "40px",
                  padding: "60px 80px",
                  flexWrap: "wrap",
                }}
              >
                {/* Left Side - Text */}
                <div
                  style={{
                    flex: "1 1 400px",
                    textAlign: "left",
                    maxWidth: "600px",
                    paddingLeft: "20px",
                  }}
                >
                  <h1 style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
                    <span style={{ color: "#711bb5" }}>Sentinel</span> : Security
                    Awareness & Policy Compliance
                  </h1>
                  <p
                    style={{
                      fontSize: "18px",
                      margin: "20px 0",
                      lineHeight: "1.6",
                    }}
                  >
                    Strengthening cyber resilience for the Sri Lanka Army IT
                    Department.
                    <br />
                    Manage policies, train users, track compliance, and report
                    incidents — all in one place.
                  </p>
                  <button
                    type="button"
                    className="neon-btn"
                    aria-label="Get Started"
                  >
                    Get Started
                  </button>
                </div>

                {/* Right Side - Logo */}
                <div style={{ flex: "1 1 300px", textAlign: "center" }}>
                  <img
                    src={logo}
                    alt="Sentinel Logo"
                    style={{ maxWidth: "320px", width: "100%", height: "auto" }}
                  />
                </div>
              </header>

              {/* Features Section */}
              <section
                className="features"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  padding: "40px 60px",
                  justifyContent: "center", // ✅ makes last row centered
                }}
              >
                {[
                  {
                    icon: "📑",
                    title: "Policy Management",
                    desc: "Publish and manage IT policies.",
                  },
                  {
                    icon: "🎓",
                    title: "Security Awareness Training",
                    desc: "Interactive security awareness training.",
                  },
                  {
                    icon: "📊",
                    title: "Compliance Dashboard",
                    desc: "Track policy acknowledgments and training.",
                  },
                  {
                    icon: "🚨",
                    title: "Incident Reporting",
                    desc: "Report and monitor incidents.",
                  },
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      minWidth: "250px",
                      borderRadius: "12px",
                      padding: "20px",
                      textAlign: "center",
                      background:
                        "linear-gradient(145deg, #111, #3a0044)", // 🖤 Black and darker purple gradient
                      color: "#fff",
                      boxShadow: "0 0 10px rgba(113,27,181,0.5)", // softer purple glow
                      transition:
                        "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor:
                        feature.title === "Compliance Dashboard"
                          ? "pointer"
                          : "default", // ✅ clickable only for dashboard
                    }}
                    onClick={() => {
                      if (feature.title === "Compliance Dashboard") {
                        navigate("/dashboard"); // ✅ navigate to dashboard
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 0 25px rgba(113,27,181,0.8)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 0 10px rgba(113,27,181,0.5)";
                    }}
                  >
                    <h2 style={{ fontSize: "30px" }}>{feature.icon}</h2>
                    <h3 style={{ margin: "10px 0", color: "#fff" }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: "15px", opacity: 0.9 }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </section>

              {/* Footer */}
              <footer
                style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "#000",
                  color: "#fff",
                }}
              >
                <p>© 2025 Sentinel | Sri Lanka Army IT Department</p>
              </footer>

              {/* Neon Button Styles */}
              <style>{`
                .neon-btn {
                  background-color: #711bb5;
                  color: #fff;
                  padding: 12px 25px;
                  border: none;
                  border-radius: 8px;
                  cursor: pointer;
                  margin-top: 10px;
                  font-size: 16px;
                  font-family: 'Poppins', sans-serif;
                  position: relative;
                  overflow: hidden;
                  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
                  outline: none;
                  z-index: 1;
                }
                .neon-btn {
                  box-shadow: 0 0 12px rgba(113,27,181,0.7), 0 0 28px rgba(113,27,181,0.45), 0 0 48px rgba(113,27,181,0.25);
                }
                .neon-btn:hover,
                .neon-btn:focus-visible {
                  transform: translateY(-1px) scale(1.05);
                  box-shadow: 0 0 16px rgba(113,27,181,0.9), 0 0 32px rgba(113,27,181,0.6), 0 0 60px rgba(113,27,181,0.4);
                }
                .neon-btn:active {
                  transform: translateY(0) scale(0.98);
                  filter: brightness(0.9);
                }
                .neon-btn::before {
                  content: "";
                  position: absolute;
                  inset: -2px;
                  border-radius: 10px;
                  background: conic-gradient(from 0deg, #711bb5, #b76bff, #ff4dff, #711bb5);
                  filter: blur(10px);
                  z-index: -1;
                  opacity: 1;
                  background-size: 200% 200%;
                  animation: neon-sweep 3s linear infinite;
                }
                @keyframes neon-sweep {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                @media (prefers-reduced-motion: reduce) {
                  .neon-btn,
                  .neon-btn::before {
                    transition: none !important;
                    animation: none !important;
                  }
                }
                @media (max-width: 768px) {
                  .hero { padding: 40px 24px !important; }
                  .features { padding: 30px 24px !important; }
                }
              `}</style>
            </div>
          }
        />

  {/* ✅ Dashboard route */}
  <Route path="/dashboard" element={<CTDPage1 />} />
  <Route path="/ctd/policy-ack" element={<CTDPolicyAck />} />
  <Route path="/ctd/training-stats" element={<CTDTraining />} />
  <Route path="/ctd/incident-severity" element={<CTDIncSevere />} />
  <Route path="/ctd/compliance-trend" element={<CTDComTrend />} />
  <Route path="/ctd/custom-report" element={<CTDCstmRpt />} />
  {/* Dev-only admin preview route (no nav link) */}
  <Route path="/ctd" element={<CTD />} />
      </Routes>
    </>
  );
}

export default App;
