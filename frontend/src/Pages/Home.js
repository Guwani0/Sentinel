import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home bg-black text-white">
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
        {/* Left Side */}
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
          <button type="button" className="neon-btn" aria-label="Get Started" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>

        {/* Right Side - Logo */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Sentinel Logo"
            style={{ maxWidth: "350px", width: "100%", height: "auto" }}
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
          justifyContent: "center",
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
              background: "linear-gradient(145deg, #111, #3a0044)",
              color: "#fff",
              boxShadow: "0 0 10px rgba(113,27,181,0.5)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
            <h3 style={{ margin: "10px 0", color: "#fff" }}>{feature.title}</h3>
            <p style={{ fontSize: "15px", opacity: 0.9 }}>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section
        className="testimonials"
        style={{
          background: "#0a0a0a",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "40px",
            color: "#b76bff",
            fontWeight: "bold",
          }}
        >
          What Our Users Say
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {[
            {
              stars: 5,
              text: "Engaging and useful security awareness training.",
              name: "John S",
            },
            {
              stars: 5,
              text: "Great platform with powerful tools and reporting!",
              name: "Wilfredo L",
            },
            {
              stars: 5,
              text: "Cut down the hours I spent troubleshooting phishing training sims.",
              name: "Joshua S",
            },
          ].map((review, idx) => (
            <div
              key={idx}
              style={{
                background: "linear-gradient(145deg, #111, #1e1e1e)",
                borderRadius: "12px",
                padding: "20px",
                color: "#fff",
                boxShadow: "0 0 15px rgba(113,27,181,0.3)",
                textAlign: "left",
              }}
            >
              <div style={{ color: "#fbbf24", marginBottom: "10px" }}>
                {"★".repeat(review.stars)}
              </div>
              <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
                "{review.text}"
              </p>
              <p style={{ fontWeight: "bold", color: "#b76bff" }}>
                {review.name}
              </p>
            </div>
          ))}
        </div>

        <button
          className="neon-btn"
          style={{ marginTop: "30px" }}
          onClick={() => alert("Redirect to reviews page")}
        >
          Read More Reviews
        </button>
      </section>

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
          box-shadow: 
            0 0 12px rgba(113, 27, 181, 0.7),
            0 0 28px rgba(113, 27, 181, 0.45),
            0 0 48px rgba(113, 27, 181, 0.25);
        }

        .neon-btn:hover,
        .neon-btn:focus-visible {
          transform: translateY(-1px) scale(1.05);
          box-shadow: 
            0 0 16px rgba(113, 27, 181, 0.9),
            0 0 32px rgba(113, 27, 181, 0.6),
            0 0 60px rgba(113, 27, 181, 0.4);
        }

        .neon-btn:active {
          transform: translateY(0) scale(0.98);
          filter: brightness(0.9);
        }
      `}</style>
    </div>
  );
}

export default Home;
