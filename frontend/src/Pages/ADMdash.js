// src/Pages/ADMdash.js
import React, { useState } from "react";

export default function ADMdash() {
  // 🎨 Shared Styles (consistent with CTDPage1.js)
  const cardStyle = {
    background: "linear-gradient(180deg, #0d0d0d 0%, #1a001f 50%, #3a0044 100%)",
    border: "1px solid #711bb5",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 0 15px rgba(113,27,181,0.35)",
    transition: "all 0.3s ease",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  };

  const buttonPrimary = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif",
    transition: "0.3s ease",
    marginRight: "8px",
  };

  const buttonSecondary = {
    backgroundColor: "#711bb5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "Poppins, sans-serif",
    transition: "0.3s ease",
  };

  // 🔧 State Example for toggles and theme
  // (dark mode toggle removed per request)

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "30px" }}>
      <h1
        style={{
          fontFamily: "Poppins",
          color: "#711bb5",
          fontSize: "2.2rem",
          marginBottom: "30px",
        }}
      >
        Admin Dashboard
      </h1>

      {/* ✅ Dashboard Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Policy Management */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>Policy Management</h3>
          <p>Upload, update, and assign security policies. View version history.</p>
          <button style={buttonSecondary}>Upload Policy</button>
          <button style={buttonPrimary}>View History</button>
        </div>

        {/* Training Management */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>Training Management</h3>
          <p>Add/edit training modules, assign them to users, and track completion.</p>
          <button style={buttonSecondary}>Add Training</button>
          <button style={buttonPrimary}>Track Completion</button>
        </div>

        {/* User & Role Management */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>User & Role Management</h3>
          <p>Manage users, assign roles, and monitor activity logs.</p>
          <button style={buttonSecondary}>Add User</button>
          <button style={buttonPrimary}>View Logs</button>
        </div>

        {/* Incident Management */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>Incident Management</h3>
          <p>View reported incidents, categorize severity, and update resolution status.</p>
          <button style={buttonSecondary}>View Incidents</button>
          <button style={buttonPrimary}>Update Status</button>
        </div>

        {/* Notifications Panel */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>Notifications Panel</h3>
          <p>Send compliance reminders, security alerts, and announcements.</p>
          <button style={buttonSecondary}>Send Alert</button>
          <button style={buttonPrimary}>View History</button>
        </div>

        {/* System Settings */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", marginBottom: "15px" }}>System Settings</h3>
          <p>Manage theme, view audit logs, and configure integrations.</p>
          {/* Dark Mode checkbox removed */}
          <button style={buttonSecondary}>Audit Logs</button>
          <button style={buttonPrimary}>Integrations</button>
        </div>
      </div>
    </div>
  );
}
