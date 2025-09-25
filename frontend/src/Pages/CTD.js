// src/Pages/CTD.js
import React from "react";
import { Link } from 'react-router-dom';
import { FaFileAlt, FaRegFileAlt, FaChalkboardTeacher, FaExclamationTriangle, FaChartLine, FaCog } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

// --- Shared sample data and constants (migrated from CTDPage1.js)
export const policyData = [
  { name: "Acknowledged", value: 1340 },
  { name: "Pending", value: 160 },
];
export const trainingData = [
  { name: "Completed", value: 1168 },
  { name: "Not Completed", value: 332 },
];
export const incidentSeverity = [
  { name: "High", value: 30 },
  { name: "Medium", value: 50 },
  { name: "Low", value: 90 },
];
export const trendData = [
  { month: "July", compliance: 40 },
  { month: "Sept", compliance: 58 },
  { month: "Oct", compliance: 62 },
  { month: "Nov", compliance: 70 },
  { month: "Dec", compliance: 82 },
];

export const COLORS = ["#711bb5", "#ffaa00", "#ff4d4d"];

export const computeTotal = (data) => (Array.isArray(data) ? data.reduce((s, p) => s + (p.value || 0), 0) : 0);

// --- Export helpers
export const exportExcel = (data, title) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, title);
  XLSX.writeFile(wb, `${title}.xlsx`);
};

export const exportPDF = (title) => {
  const doc = new jsPDF();
  doc.text(`${title} Report`, 20, 20);
  doc.save(`${title}.pdf`);
};

// --- Shared styles exported so other pages can reuse them
export const cardStyle = {
  background: "linear-gradient(180deg, #0d0d0d 0%, #1a001f 50%, #3a0044 100%)",
  border: "1px solid #711bb5",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 0 15px rgba(113,27,181,0.35)",
  transition: "all 0.3s ease",
  color: "#fff",
  fontFamily: "Inter, sans-serif",
};

export const clickableCard = { ...cardStyle, cursor: 'pointer', outline: 'none' };
export const cardHeaderStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'Poppins', marginBottom: '15px' };
export const linkCardStyle = { textDecoration: 'none', display: 'block', color: 'inherit' };

export const buttonPrimary = {
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

export const buttonSecondary = {
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

export const cardCompactStyle = { ...cardStyle, alignSelf: 'start', padding: '14px', minHeight: 'auto' };

// Shared dropdown style
export const dropdownStyle = {
  width: "100%",
  margin: "6px 0",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #444",
  background: "#000",
  color: "#fff",
};

// Reusable donut tooltip: shows slice name, value and percent of total
export const DonutTooltip = ({ active, payload, total }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  const value = item.value || 0;
  const name = item.name || item.dataKey || '';
  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
  return (
    <div style={{ background: '#111', padding: 10, borderRadius: 8, color: '#fff', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{name}</div>
      <div style={{ color: '#cfcfcf' }}>{value} users</div>
      <div style={{ marginTop: 6, color: '#a78bfa', fontWeight: 700 }}>{pct}%</div>
    </div>
  );
};

// Custom tooltip to avoid duplicate entries (Area + Line using same dataKey)
export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const seen = new Set();
  const filtered = payload.filter((p) => {
    const key = p.dataKey || p.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div style={{ background: '#111', padding: '8px', border: '1px solid #333', color: '#fff' }}>
      <div style={{ fontSize: 12, marginBottom: 6 }}>{label}</div>
      {filtered.map((p, idx) => (
        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', minWidth: 140 }}>
          <span style={{ color: p.stroke || '#fff' }}>{p.name || p.dataKey}</span>
          <span style={{ fontWeight: 700 }}>{`${p.value}%`}</span>
        </div>
      ))}
    </div>
  );
};

export default function CTD() {

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "30px" }}>
      <h1 className="text-purple-400" style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
        marginBottom: "30px",
        fontWeight: 800,
        letterSpacing: '0.6px',
        background: 'linear-gradient(90deg,#9b4cf8 0%, #711bb5 40%, #ff6aa3 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        textShadow: '0 2px 6px rgba(0,0,0,0.6)'
      }}>
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

        {/* Audit Logs (replaces System Settings) */}
        <Link to="/ctd/audit-logs" aria-label="Audit Logs" style={linkCardStyle}>
          <div style={clickableCard}>
          <h3 style={cardHeaderStyle}>
            <FaFileAlt style={{ color: '#f3f3f3', width: 20, height: 20 }} />
            Audit Logs
          </h3>
          <p>View and search immutable audit trails for policy changes, user actions, and exports.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
