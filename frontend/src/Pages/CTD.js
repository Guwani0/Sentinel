// src/Pages/CTD.js
import React from "react";
import { Link } from 'react-router-dom';
import { FaFileAlt, FaRegFileAlt, FaChalkboardTeacher, FaExclamationTriangle, FaChartLine, FaCog } from 'react-icons/fa';

export default function CTD() {
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

  // note: button styles removed (not used in this file) to avoid lint warnings

  const clickableCard = {
    ...cardStyle,
    cursor: 'pointer',
    outline: 'none'
  };

  const cardHeaderStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Poppins', marginBottom: '15px' };

  // no imperative navigation required — using semantic <Link> components

  // We use semantic <Link> components for navigation (better accessibility)
  const linkCardStyle = {
    textDecoration: 'none',
    display: 'block',
    color: 'inherit',
  };

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
        Compliance Tracking Dashboard
      </h1>

      {/* ✅ Dashboard Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Policy Acknowledgement Rate */}
        <Link to="/ctd/policy-ack" aria-label="Policy Acknowledgement Rate" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaFileAlt style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Policy Acknowledgement Rate
          </h3>
          <p>View the percentage of employees who have acknowledged required policies and drill into policy-level details.</p>
          </div>
        </Link>

        {/* Training Management */}
        {/* Training Completion Statistics */}
        <Link to="/ctd/training-stats" aria-label="Training Completion Statistics" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaChalkboardTeacher style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Training Completion Statistics
          </h3>
          <p>Overview of training completion rates, overdue learners, and course engagement metrics.</p>
          </div>
        </Link>

        {/* User & Role Management */}
        {/* Incident Severity Breakdown */}
        <Link to="/ctd/incident-severity" aria-label="Incident Severity Breakdown" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaExclamationTriangle style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Incident Severity Breakdown
          </h3>
          <p>Breakdown of incidents by severity, trending over time to highlight high-risk areas.</p>
          </div>
        </Link>

        {/* Incident Management */}
        {/* Compliance Trend (Last 6 Months) */}
        <Link to="/ctd/compliance-trend" aria-label="Compliance Trend" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaChartLine style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Compliance Trend (Last 6 Months)
          </h3>
          <p>Line chart overview of compliance metrics across the last 6 months with target lines and trend indicators.</p>
          </div>
        </Link>

        {/* Notifications Panel */}
        {/* Custom Report Builder */}
        <Link to="/ctd/custom-report" aria-label="Custom Report Builder" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaRegFileAlt style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Custom Report Builder
          </h3>
          <p>Build and export custom compliance reports for roles, teams, and date ranges.</p>
          </div>
        </Link>

        {/* System Settings */}
        <Link to="/ctd/settings" aria-label="System Settings" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaCog style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            System Settings
          </h3>
          <p>Manage theme, view audit logs, and configure integrations.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
