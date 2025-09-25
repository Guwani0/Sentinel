import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Area, ReferenceLine
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
  const incidentSeverity = [
    { name: "High", value: 30 },
    { name: "Medium", value: 50 },
    { name: "Low", value: 90 },
  ];
  const trendData = [
    { month: "July", compliance: 40 },
    { month: "Sept", compliance: 58 },
    { month: "Oct", compliance: 62 },
    { month: "Nov", compliance: 70 },
    { month: "Dec", compliance: 82 },
  ];

  const COLORS = ["#711bb5", "#ffaa00", "#ff4d4d"];

  // totals for donut tooltips
  const policyTotal = policyData.reduce((s, p) => s + (p.value || 0), 0);
  const trainingTotal = trainingData.reduce((s, p) => s + (p.value || 0), 0);
  const incidentTotal = incidentSeverity.reduce((s, p) => s + (p.value || 0), 0);

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

  // 🎨 Styles
  const cardStyle = {
    background: "linear-gradient(180deg, #0d0d0d 0%, #1a001f 50%, #3a0044 100%)",
    border: "1px solid #711bb5",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 0 15px rgba(113,27,181,0.35)",
    transition: "all 0.3s ease",
    textAlign: "center",
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

  // Compact card variant used for right-column widgets to avoid large empty space
  const cardCompactStyle = {
    ...cardStyle,
    alignSelf: 'start',
    padding: '14px',
    minHeight: 'auto'
  };

  // ✅ User Role (simulate login role) - not currently used
  // const [userRole] = useState("Employee"); // Change to "Admin" or "Manager" to test

  // Custom Report Builder state
  const [customRole, setCustomRole] = useState("");
  const [customUserType, setCustomUserType] = useState("");
  const [customDateRange, setCustomDateRange] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState([]);

  // Build a small summary data structure for export based on selected filters
  const buildCustomReportData = () => {
    const totalPolicy = policyData.reduce((s, e) => s + (e.value || 0), 0);
    const totalTraining = trainingData.reduce((s, e) => s + (e.value || 0), 0);
    const totalIncidents = incidentSeverity.reduce((s, e) => s + (e.value || 0), 0);

    return [
      { Field: "Role", Value: customRole || "All" },
      { Field: "User Type", Value: customUserType || "All" },
      { Field: "Date Range", Value: customDateRange || "All" },
      { Field: "Policy Acknowledged", Value: totalPolicy },
      { Field: "Training Completed", Value: totalTraining },
      { Field: "Total Incidents", Value: totalIncidents },
    ];
  };

  const exportCustomReport = () => {
    const data = buildCustomReportData();
    // Export both XLSX and PDF (PDF helper simply adds a title in this file)
    exportExcel(data, "Custom_Report");
    exportPDF("Custom_Report");
  };

  const handlePreview = () => {
    const data = buildCustomReportData();
    setPreviewData(data);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  // Custom tooltip to avoid duplicate entries (Area + Line using same dataKey)
  const CustomTooltip = ({ active, payload, label }) => {
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

  // Reusable donut tooltip: shows slice name, value and percent of total
  const DonutTooltip = ({ active, payload, total }) => {
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

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "30px", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{
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

  {/* ✅ First Row - Donut Charts Horizontally */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "25px" }}>
        
        {/* Policy Ack */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: "15px" }}>
            Policy Acknowledgement Rate
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie data={policyData} dataKey="value" innerRadius={55} outerRadius={85}>
                  {policyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip content={(props) => <DonutTooltip {...props} total={policyTotal} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontFamily: "Poppins", marginTop: "20px", fontWeight: "600" }}>
            92% (1340/1500 users)
          </p>
        </div>

        {/* Training Stats */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: "15px" }}>
            Training Completion Statistics
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trainingData} dataKey="value" innerRadius={55} outerRadius={85}>
                  {trainingData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip content={(props) => <DonutTooltip {...props} total={trainingTotal} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontFamily: "Poppins", marginTop: "20px", fontWeight: "600" }}>
            88% (1168/1500 users)
          </p>
        </div>

        {/* Incident Severity */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: "15px" }}>
            Incident Severity Breakdown
          </h3>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incidentSeverity} dataKey="value" innerRadius={55} outerRadius={85}>
                  {incidentSeverity.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={(props) => <DonutTooltip {...props} total={incidentTotal} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
            <span style={{ color: "#ff4d4d", fontWeight: "600" }}>High</span>
            <span style={{ color: "#ffaa00", fontWeight: "600" }}>Medium</span>
            <span style={{ color: "#711bb5", fontWeight: "600" }}>Low</span>
          </div>
        </div>
      </div>

      {/* ✅ Second Row */}
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 2fr))", gap: "25px" }}>
        
        {/* Compliance Trend */}
        <div style={cardStyle}>
    <h3 style={{ fontFamily: "Poppins", color: "#a78bfa" }}>Compliance Trend</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2b2b2b" />
                <XAxis dataKey="month" stroke="#fff" tick={{ fill: '#ddd' }} />
                <YAxis stroke="#fff" tick={{ fill: '#ddd' }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={75} stroke="#ffaa00" strokeDasharray="4 4" label={{ value: 'Target 75%', position: 'top', fill: '#ffaa00' }} />
                <Legend wrapperStyle={{ color: '#fff' }} />
                {/* Use a single semi-transparent fill to match the line color */}
                <Area type="monotone" dataKey="compliance" stroke="none" fill="#711bb5" fillOpacity={0.12} name="" legendType="none" />
                <Line type="monotone" dataKey="compliance" stroke="#711bb5" strokeWidth={2} dot={{ r: 4, stroke: '#fff', strokeWidth: 1 }} activeDot={{ r: 6 }} name="Compliance" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

  {/* Automated Reminders */}
  <div style={cardCompactStyle}>
          <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: 8 }}>Automated Reminders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Policy Nudges', state: policy, setter: setPolicy },
              { label: 'Training Alerts', state: training, setter: setTraining },
              { label: 'Overdue Incidents', state: incidents, setter: setIncidents },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontFamily: 'sans-serif' }}>{item.label}</div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => item.setter(!item.state)}
                  style={{
                    width: 46, height: 24, borderRadius: 20,
                    background: item.state ? '#711bb5' : '#444',
                    position: 'relative', cursor: 'pointer', transition: '0.2s'
                  }}
                  onClick={() => item.setter(!item.state)}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 3, left: item.state ? 25 : 3, transition: '0.2s'
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, color: '#aaa', fontSize: 12, textAlign: 'right' }}>Next run: Tomorrow 9AM</div>
        </div>
      </div>

  {/* ✅ Third Row */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginTop: "25px", alignItems: 'start' }}>
        
        {/* Compliance Reports */}
        <div style={cardStyle}>
          <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: 12 }}>Compliance Reports</h3>
          {/* Compact list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
            {[
              { title: 'Q4 2024 Policy Report', pdf: 'Policy_Report', xlsxData: policyData },
              { title: 'Nov 2024 Training Data', pdf: 'Training_Data', xlsxData: trainingData },
              { title: 'Incident Log', pdf: 'Incident_Log', xlsxData: trendData },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontFamily: 'sans-serif', fontSize: 14 }}>{r.title}</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    style={{ ...buttonSecondary, padding: '6px 10px', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    onClick={() => exportPDF(r.pdf)}
                    aria-label={`Export ${r.title} as PDF`}
                  >PDF</button>
                  <button
                    style={{ ...buttonPrimary, padding: '6px 10px', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                    onClick={() => exportExcel(r.xlsxData, r.pdf)}
                    aria-label={`Export ${r.title} as XLSX`}
                  >XLSX</button>
                </div>
              </div>
            ))}
          </div>
        </div>

  {/* Custom Report Builder */}
  <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
  <h3 style={{ fontFamily: "Poppins", color: "#a78bfa", marginBottom: "15px" }}>
    Custom Report Builder
  </h3>

  {/* ✅ First dropdown changed: Role only */}
  <select style={dropdownStyle} value={customRole} onChange={(e) => setCustomRole(e.target.value)}>
    <option value="" disabled hidden>select role</option>
    <option value="Manager">Manager</option>
    <option value="Admin">Admin</option>
  </select>

  <select style={dropdownStyle} value={customUserType} onChange={(e) => setCustomUserType(e.target.value)}>
    <option value="" disabled hidden>Select User Type</option>
    <option value="Regular">Regular</option>
    <option value="Supervisor">Supervisor</option>
    <option value="Executive">Executive</option>
  </select>

  <select style={dropdownStyle} value={customDateRange} onChange={(e) => setCustomDateRange(e.target.value)}>
    <option value="" disabled hidden>Select Date Range</option>
    <option value="Last 7 Days">Last 7 Days</option>
    <option value="Last 30 Days">Last 30 Days</option>
    <option value="Last 6 Months">Last 6 Months</option>
  </select>

  <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
    <button style={{ ...buttonPrimary, flex: 1 }} onClick={handlePreview}>Preview</button>
    <button
      style={{ ...buttonSecondary, flex: 1 }}
      onClick={exportCustomReport}
      disabled={!(customRole && customUserType && customDateRange)}
    >
      Export
    </button>
  </div>

  {/* Modal preview overlay - does not affect surrounding layout */}
  {showPreview && (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }} aria-modal={true} role="dialog">
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} onClick={closePreview} />
      <div style={{ width: '720px', maxWidth: '95%', maxHeight: '80vh', overflowY: 'auto', background: '#0b0b0b', border: '1px solid rgba(167,139,250,0.12)', borderRadius: 12, padding: 18, boxShadow: '0 8px 30px rgba(0,0,0,0.6)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: 16 }}>Preview: Custom Report</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ ...buttonSecondary }} onClick={exportCustomReport}>Export</button>
            <button style={{ ...buttonPrimary }} onClick={closePreview}>Close</button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
            <tbody>
              {previewData.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '8px 6px', width: '60%', fontWeight: 600 }}>{row.Field}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'right' }}>{row.Value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

// Shared dropdown style
const dropdownStyle = {
  width: "100%",
  margin: "6px 0",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #444",
  background: "#000",
  color: "#fff",
};
