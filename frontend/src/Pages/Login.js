import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Dummy hardcoded credentials for now
  const users = {
    "ADM-IT-001": { password: "admin123", role: "admin" },
    "SEC-IT-001": { password: "sec123", role: "security" },
    "EMP-IT-001": { password: "emp123", role: "employee" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (users[username] && users[username].password === password) {
      const role = users[username].role;
      if (role === "admin") navigate("/admin");
      else if (role === "security") navigate("/security");
      else if (role === "employee") navigate("/employee");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side with gradient / logo / tagline */}
      <div className="login-left">
        <div className="overlay">
          <h1>Be a Part of <br /> Something <span>Secure</span></h1>
          <p>Sentinel — Security Awareness & Policy Compliance</p>
        </div>
      </div>

      {/* Right Side with login form */}
      <div className="login-right">
        <div className="login-form">
          <h2>Login</h2>
          <p className="subtitle">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="login-btn">Login</button>
          </form>

          <p className="signup-text">
            Not a member? <a href="#">Create an account</a>
          </p>
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

        .login-btn:hover {
          background: #8c33d9;
          box-shadow: 0 0 25px rgba(113, 27, 181, 0.9);
        }

        .signup-text {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: #bbb;
        }

        .signup-text a {
          color: #ff4dff;
          text-decoration: none;
        }

        .signup-text a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export default Login;
