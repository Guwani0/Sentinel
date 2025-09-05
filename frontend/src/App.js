import React from "react";
import Navbar from "./Components/Navbar";
import logo from "./assets/logo.png"; // make sure logo.png exists in /src/assets/

function App() {
  return (
    <div className="App">
      <Navbar />

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
          <p style={{ fontSize: "18px", margin: "20px 0", lineHeight: "1.6" }}>
            Strengthening cyber resilience for the Sri Lanka Army IT Department.
            <br />
            Manage policies, train users, track compliance, and report incidents
            — all in one place.
          </p>
          <button type="button" className="neon-btn" aria-label="Get Started">
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
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
              background: "linear-gradient(145deg, #111, #3a0044)", // 🖤 Black and darker purple gradient
              color: "#fff",
              boxShadow: "0 0 10px rgba(113,27,181,0.5)", // softer purple glow
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(113,27,181,0.8)"; // brighter glow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(113,27,181,0.5)"; // soft glow back
            }}
          >
            <h2 style={{ fontSize: "30px" }}>{feature.icon}</h2>
            <h3 style={{ margin: "10px 0", color: "#fff" }}>{feature.title}</h3>
            <p style={{ fontSize: "15px", opacity: 0.9 }}>{feature.desc}</p>
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

        /* Always glowing */
        .neon-btn {
          box-shadow: 0 0 12px rgba(113,27,181,0.7), 0 0 28px rgba(113,27,181,0.45), 0 0 48px rgba(113,27,181,0.25);
        }

        /* On hover -> stronger glow + lift */
        .neon-btn:hover,
        .neon-btn:focus-visible {
          transform: translateY(-1px) scale(1.05);
          box-shadow: 0 0 16px rgba(113,27,181,0.9), 0 0 32px rgba(113,27,181,0.6), 0 0 60px rgba(113,27,181,0.4);
        }

        /* Active press */
        .neon-btn:active {
          transform: translateY(0) scale(0.98);
          filter: brightness(0.9);
        }

        /* Animated glowing border sweep */
        .neon-btn::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 10px;
          background: conic-gradient(
            from 0deg,
            #711bb5,
            #b76bff,
            #ff4dff,
            #711bb5
          );
          filter: blur(10px);
          z-index: -1;
          opacity: 1; /* Always visible */
          background-size: 200% 200%;
          animation: neon-sweep 3s linear infinite;
        }

        @keyframes neon-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Accessibility: reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .neon-btn,
          .neon-btn::before {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Responsive padding */
        @media (max-width: 768px) {
          .hero { padding: 40px 24px !important; }
          .features { padding: 30px 24px !important; }
        }
      `}</style>
    </div>
  );
}

export default App;
