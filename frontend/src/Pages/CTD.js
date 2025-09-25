// src/Pages/CTD.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
    marginRight: "12px",
  };

  const clickableCard = {
    ...cardStyle,
    cursor: 'pointer',
    outline: 'none'
  };

  const cardHeaderStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Poppins', marginBottom: '15px' };

  // navigation
  const navigate = useNavigate();

  const makeNavigateHandler = (path) => (e) => {
    // allow links to be used even if clicked on nested elements
    navigate(path);
  };

  const handleKeyDown = (path) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(path);
    }
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
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/policy-ack')}
          onKeyDown={handleKeyDown('/ctd/policy-ack')}
        >
          <h3 style={cardHeaderStyle}>
            <FaFileAlt style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Policy Acknowledgement Rate
          </h3>
          <p>View the percentage of employees who have acknowledged required policies and drill into policy-level details.</p>
        </div>

        {/* Training Management */}
        {/* Training Completion Statistics */}
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/training-stats')}
          onKeyDown={handleKeyDown('/ctd/training-stats')}
        >
          <h3 style={cardHeaderStyle}>
            <FaChalkboardTeacher style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Training Completion Statistics
          </h3>
          <p>Overview of training completion rates, overdue learners, and course engagement metrics.</p>
        </div>

        {/* User & Role Management */}
        {/* Incident Severity Breakdown */}
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/incident-severity')}
          onKeyDown={handleKeyDown('/ctd/incident-severity')}
        >
          <h3 style={cardHeaderStyle}>
            <FaExclamationTriangle style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Incident Severity Breakdown
          </h3>
          <p>Breakdown of incidents by severity, trending over time to highlight high-risk areas.</p>
        </div>

        {/* Incident Management */}
        {/* Compliance Trend (Last 6 Months) */}
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/compliance-trend')}
          onKeyDown={handleKeyDown('/ctd/compliance-trend')}
        >
          <h3 style={cardHeaderStyle}>
            <FaChartLine style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Compliance Trend (Last 6 Months)
          </h3>
          <p>Line chart overview of compliance metrics across the last 6 months with target lines and trend indicators.</p>
        </div>

        {/* Notifications Panel */}
        {/* Custom Report Builder */}
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/custom-report')}
          onKeyDown={handleKeyDown('/ctd/custom-report')}
        >
          <h3 style={cardHeaderStyle}>
            <FaRegFileAlt style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Custom Report Builder
          </h3>
          <p>Build and export custom compliance reports for roles, teams, and date ranges.</p>
        </div>

        {/* System Settings */}
        <div
          style={clickableCard}
          role="button"
          tabIndex={0}
          onClick={makeNavigateHandler('/ctd/settings')}
          onKeyDown={handleKeyDown('/ctd/settings')}
        >
          <h3 style={cardHeaderStyle}>
            <FaCog style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            System Settings
          </h3>
          <p>Manage theme, view audit logs, and configure integrations.</p>
        </div>
      </div>
    </div>
  );
}
