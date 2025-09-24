import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend
} from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export default function CTDPage1() {
  // ✅ Sample Data
  const policyData = [
    { name: "Acknowledged", value: 1340 },
    { name: "Pending", value: 160 },
  ];
  const trainingData = [
    { name: "Completed", value: 1168 },
    { name: "Not Completed", value: 332 },
  ];
  const trendData = [
    { month: "July", compliance: 40 },
    { month: "Sept", compliance: 58 },
    { month: "Oct", compliance: 62 },
    { month: "Nov", compliance: 70 },
    { month: "Dec", compliance: 82 },
  ];
  const incidentSeverity = [
    { name: "High", value: 30 },
    { name: "Medium", value: 50 },
    { name: "Low", value: 90 },
  ];

  const COLORS = ["#711bb5", "#ffaa00", "#ff4d4d"];

  // ✅ Export Excel
  const exportExcel = (data, title) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title}.xlsx`);
  };

  // ✅ Export PDF
  const exportPDF = (title) => {
    const doc = new jsPDF();
    doc.text(`${title} Report`, 20, 20);
    doc.save(`${title}.pdf`);
  };

  // 🎨 Shared Styles
  const cardStyle = {
    background: "linear-gradient(180deg, #0d0d0d 0%, #1a001f 50%, #3a0044 100%)",
    border: "1px solid #711bb5",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 0 15px rgba(113,27,181,0.35)",
    transition: "all 0.3s ease",
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
  };

  // ✅ Toggle States
  const [policy, setPolicy] = useState(true);
  const [training, setTraining] = useState(true);
  const [incidents, setIncidents] = useState(true);

  const toggleWrapper = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",
    fontFamily: "Inter, sans-serif",
  };

  const toggleStyle = (active) => ({
    width: "50px",
    height: "26px",
    borderRadius: "20px",
    background: active ? "#711bb5" : "#444",
    position: "relative",
    cursor: "pointer",
    transition: "0.3s",
  });

  const knobStyle = (active) => ({
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: "3px",
    left: active ? "26px" : "3px",
    transition: "0.3s",
  });

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "30px", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ fontFamily: "Poppins", color: "#711bb5", fontSize: "2.2rem", marginBottom: "30px" }}>
        Compliance Tracking Dashboard
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "25px" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Policy Ack */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff" }}>Policy Acknowledgement Rate</h3>
            <PieChart width={200} height={200}>
              <Pie data={policyData} dataKey="value" innerRadius={50} outerRadius={80}>
                {policyData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
            <p style={{ fontFamily: "Poppins", marginTop: "10px", fontWeight: "600" }}>92% (1340/1500 users)</p>
          </div>

          {/* Training Stats */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff" }}>Training Completion Statistics</h3>
            <PieChart width={200} height={200}>
              <Pie data={trainingData} dataKey="value" innerRadius={50} outerRadius={80}>
                {trainingData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
            <p style={{ fontFamily: "Poppins", marginTop: "10px", fontWeight: "600" }}>88% (1168/1500 users)</p>
          </div>

          {/* ✅ Automated Reminders with Toggles */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff" }}>Automated Reminders</h3>

            <div style={toggleWrapper}>
              <span>Policy Nudges</span>
              <div style={toggleStyle(policy)} onClick={() => setPolicy(!policy)}>
                <div style={knobStyle(policy)} />
              </div>
            </div>

            <div style={toggleWrapper}>
              <span>Training Alerts</span>
              <div style={toggleStyle(training)} onClick={() => setTraining(!training)}>
                <div style={knobStyle(training)} />
              </div>
            </div>

            <div style={toggleWrapper}>
              <span>Overdue Incidents</span>
              <div style={toggleStyle(incidents)} onClick={() => setIncidents(!incidents)}>
                <div style={knobStyle(incidents)} />
              </div>
            </div>

            <small style={{ color: "#aaa" }}>Next run: Tomorrow 9AM</small>
          </div>
        </div>

        {/* Middle Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Incident Severity Breakdown */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff", marginBottom: "15px" }}>
              Incident Severity Breakdown
            </h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <PieChart width={220} height={220}>
                <Pie
                  data={incidentSeverity}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {incidentSeverity.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              <span style={{ color: "#ff4d4d", fontWeight: "600" }}>High</span>
              <span style={{ color: "#ffaa00", fontWeight: "600" }}>Medium</span>
              <span style={{ color: "#711bb5", fontWeight: "600" }}>Low</span>
            </div>
          </div>

          {/* Compliance Trend */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff" }}>Compliance Trend (Last 6 Months)</h3>
            <LineChart width={500} height={250} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="compliance" stroke="#711bb5" strokeWidth={2} />
            </LineChart>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Compliance Reports */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff" }}>Compliance Reports</h3>
            <p>Q4 2024 Policy Report
              <button style={buttonSecondary} onClick={() => exportPDF("Policy_Report")}>PDF</button>
              <button style={buttonPrimary} onClick={() => exportExcel(policyData, "Policy_Report")}>XLSX</button>
            </p>
            <p>Nov 2024 Training Data
              <button style={buttonSecondary} onClick={() => exportPDF("Training_Data")}>PDF</button>
              <button style={buttonPrimary} onClick={() => exportExcel(trainingData, "Training_Data")}>XLSX</button>
            </p>
            <p>Incident Log
              <button style={buttonSecondary} onClick={() => exportPDF("Incident_Log")}>PDF</button>
              <button style={buttonPrimary} onClick={() => exportExcel(trendData, "Incident_Log")}>XLSX</button>
            </p>
          </div>

          {/* Custom Report Builder */}
          <div style={cardStyle}>
            <h3 style={{ fontFamily: "Poppins", color: "#fff", marginBottom: "15px" }}>
              Custom Report Builder
            </h3>
            <input
              type="text"
              placeholder="Select Department / Role"
              style={{
                width: "100%",
                margin: "6px 0",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#000",
                color: "#fff",
              }}
            />
            <input
              type="text"
              placeholder="Select User Type / Manager"
              style={{
                width: "100%",
                margin: "6px 0",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#000",
                color: "#fff",
              }}
            />
            <input
              type="text"
              placeholder="Date Range (e.g. Last 30 days)"
              style={{
                width: "100%",
                margin: "6px 0",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#000",
                color: "#fff",
              }}
            />
            <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
              <button style={{ ...buttonPrimary, flex: 1 }}>Preview</button>
              <button style={{ ...buttonSecondary, flex: 1 }}>Export</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
