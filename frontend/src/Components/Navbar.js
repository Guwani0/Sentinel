  import React, { useState } from "react";
  import { Link } from "react-router-dom";   
  import logo from "../assets/logo.png";

  function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Policies", href: "/policies" },
      { name: "Contact", href: "/contact" },
      { name: "Login", href: "/login" }   
    ];

    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            {/* Logo + Text */}
            <div className="nav-logo">
              <div className="logo-box">
                <img src={logo} alt="Sentinel Logo" className="logo-img" />
                <span className="logo-text">SENTINEL</span>
              </div>
            </div>

            {/* Links */}
            <ul className={`nav-links ${open ? "active" : ""}`}>
              {links.map((link) => (
                <li key={link.name}>
                  {/* ✅ use Link instead of <a> */}
                  <Link to={link.href} className="nav-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Toggle Button */}
            <button className="nav-toggle" onClick={() => setOpen(!open)}>
              {open ? "✖" : "☰"}
            </button>
          </div>
        </nav>

        {/* Inline CSS */}
        <style>{`
          .navbar {
            background-color: #000000; /* black */
            color: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
          }

          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          /* Logo box */
          .logo-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .logo-img {
            height: 70px;
            width: auto;
            margin-bottom: 5px;
          }

          .logo-text {
            color: #ffffff;
            font-size: 1rem;
            font-family: 'Lato', sans-serif;
          }

          /* Links */
          .nav-links {
            display: flex;
            list-style: none;
            gap: 5rem;
          }

          .nav-link {
            font-family: 'Inter', sans-serif;
            color: #ffffff;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
            padding: 0.5rem 0;
          }

          .nav-link:hover {
            color: #711bb5;
          }

          /* Toggle button */
          .nav-toggle {
            display: none;
            background: none;
            border: none;
            font-size: 1.8rem;
            color: white;
            cursor: pointer;
          }

          /* Mobile menu */
          @media (max-width: 768px) {
            .nav-links {
              position: absolute;
              top: 100px;
              left: 0;
              width: 100%;
              flex-direction: column;
              background-color: #111;
              padding: 1rem;
              display: none;
            }

            .nav-links.active {
              display: flex;
            }

            .nav-toggle {
              display: block;
            }

            .nav-link {
              padding: 0.75rem 0;
            }
          }
        `}</style>
      </>
    );
  }

  export default Navbar;
