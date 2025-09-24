import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Invalid credentials");
        return;
      }

      setUserId(data.userId);
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      // Save JWT + user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "security") navigate("/security");
      else if (data.user.role === "employee") navigate("/employee");
    } catch (err) {
      console.error(err);
      alert("Verification failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side with gradient / tagline */}
      <div className="login-left">
        <div className="overlay">
          <h1>
            Discipline in Access, <br /> Strength in <span>Security</span>
          </h1>
          <p>Sentinel — Security Awareness & Policy Compliance</p>
        </div>
      </div>

      {/* Right Side with login form */}
      <div className="login-right">
        <div className="login-form">
          <h2>Login</h2>
          <p className="subtitle">Enter your credentials to access your account</p>

          <form onSubmit={step === 'login' ? handleLoginSubmit : handleOtpSubmit}>
            {step === 'login' ? (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                </div>

                <div className="form-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <hr />
                <button type="button" onClick={() => setStep('login')} className="back-btn">
                  Back to Login
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Inline CSS */}
      <style>{`
        .login-wrapper {
          display: flex;
          height: 100vh;
          font-family: 'Poppins', sans-serif;
          background: #0a0a0a;
          color: #fff;
        }

        .login-left {
          flex: 1;
          background: radial-gradient(circle at top left, #711bb5, #000);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: left;
          padding: 2rem;
        }

        .login-left h1 {
          font-size: 2.5rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .login-left span {
          color: #ff4dff;
        }

        .login-left p {
          margin-top: 1rem;
          font-size: 1rem;
          color: #ddd;
        }

        .login-right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #111;
        }

        .login-form {
          background: #1a1a1a;
          padding: 2.5rem;
          border-radius: 12px;
          width: 360px;
          box-shadow: 0 0 20px rgba(113, 27, 181, 0.5);
        }

        .login-form h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: #fff;
          text-align: center;
        }

        .login-form .subtitle {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #bbb;
          font-size: 0.9rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.9rem;
          color: #ccc;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #444;
          border-radius: 8px;
          background: #222;
          color: #fff;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }

        .form-group input:focus {
          border-color: #711bb5;
          box-shadow: 0 0 6px rgba(113, 27, 181, 0.6);
          outline: none;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
          font-size: 0.85rem;
          color: #aaa;
        }

        .form-options a {
          color: #711bb5;
          text-decoration: none;
        }

        .form-options a:hover {
          text-decoration: underline;
        }

        .login-btn {
          width: 100%;
          background: #711bb5;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(113, 27, 181, 0.6);
        }

        .login-btn:hover:enabled {
          background: #8c33d9;
          box-shadow: 0 0 25px rgba(113, 27, 181, 0.9);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
          .back-btn {
          width: 100%;
          background: #711bb5;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 15px rgba(113, 27, 181, 0.6);
        }

        .back-btn:hover:enabled {
          background: #8c33d9;
          box-shadow: 0 0 25px rgba(113, 27, 181, 0.9);
        }

        .back-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default Login;
