// src/Pages/CTD.js
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaRegFileAlt,
  FaChalkboardTeacher,
  FaExclamationTriangle,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import Header from "../Components/Header"; // ✅ Added header import

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

export const computeTotal = (data) =>
  Array.isArray(data) ? data.reduce((s, p) => s + (p.value || 0), 0) : 0;

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

export const clickableCard = { ...cardStyle, cursor: "pointer", outline: "none" };
export const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "Poppins",
  marginBottom: "15px",
};
export const linkCardStyle = {
  textDecoration: "none",
  display: "block",
  color: "inherit",
};

export default function CTD() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "30px" }}>
      {/* ✅ Global Header */}
      <Header user={{ username: "Admin", role: "admin" }} /> <br/> <br/>

   <h1 className="text-5xl font-bold mb-6 text-purple-400 text-left">
  Compliance Tracking Dashboard
</h1>

      {/* ✅ Dashboard Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        {/* Policy Acknowledgement Rate */}
        <Link
          to="/ctd/policy-ack"
          aria-label="Policy Acknowledgement Rate"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaFileAlt style={{ color: "#f3f3f3", width: 20, height: 20 }} />
              Policy Acknowledgement Rate
            </h3>
            <p>
              View the percentage of employees who have acknowledged required
              policies and drill into policy-level details.
            </p>
          </div>
        </Link>

        {/* Training Completion Statistics */}
        <Link
          to="/ctd/training-stats"
          aria-label="Training Completion Statistics"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaChalkboardTeacher
                style={{ color: "#f3f3f3", width: 20, height: 20 }}
              />
              Training Completion Statistics
            </h3>
            <p>
              Overview of training completion rates, overdue learners, and course
              engagement metrics.
            </p>
          </div>
        </Link>

        {/* Incident Severity Breakdown */}
        <Link
          to="/ctd/incident-severity"
          aria-label="Incident Severity Breakdown"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaExclamationTriangle
                style={{ color: "#f3f3f3", width: 20, height: 20 }}
              />
              Incident Severity Breakdown
            </h3>
            <p>
              Breakdown of incidents by severity, trending over time to highlight
              high-risk areas.
            </p>
          </div>
        </Link>

        {/* Compliance Trend */}
        <Link
          to="/ctd/compliance-trend"
          aria-label="Compliance Trend"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaChartLine style={{ color: "#f3f3f3", width: 20, height: 20 }} />
              Compliance Trend (Last 6 Months)
            </h3>
            <p>
              Line chart overview of compliance metrics across the last 6 months
              with target lines and trend indicators.
            </p>
          </div>
        </Link>

        {/* Custom Report Builder */}
        <Link
          to="/ctd/custom-report"
          aria-label="Custom Report Builder"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaRegFileAlt style={{ color: "#f3f3f3", width: 20, height: 20 }} />
              Custom Report Builder
            </h3>
            <p>
              Build and export custom compliance reports for roles, teams, and date
              ranges.
            </p>
          </div>
        </Link>

        {/* Audit Logs */}
        <Link
          to="/ctd/audit-logs"
          aria-label="Audit Logs"
          style={linkCardStyle}
        >
          <div style={clickableCard}>
            <h3 style={cardHeaderStyle}>
              <FaFileAlt style={{ color: "#f3f3f3", width: 20, height: 20 }} /> Audit
              Logs
            </h3>
            <p>
              View and search immutable audit trails for policy changes, user
              actions, and exports.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
