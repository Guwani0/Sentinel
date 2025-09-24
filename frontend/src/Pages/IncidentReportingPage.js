import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import jsPDF from "jspdf";


// Reusable MultiCheckbox component
const MultiCheckbox = ({ label, options, selectedValues, onChange }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: "block", marginBottom: 6 }}>{label}</label>
    {options.map((opt) => (
      <label key={opt} style={{ display: "block", fontSize: 14, cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={selectedValues.includes(opt)}
          onChange={(e) => onChange(e, opt)}
          style={{ marginRight: 6 }}
        />
        {opt}
      </label>
    ))}
  </div>
);


export default function IncidentReportingPage() {
  const navigate = useNavigate();
  const location = useLocation(); // NEW: get previous state
  const prefillData = location.state?.formData;

   const [form, setForm] = useState({
    reporterName: prefillData?.reporterName || "",
    email: prefillData?.email || "",
    phone: prefillData?.phone || "",
    organization: prefillData?.organization || "",
    dateTime: prefillData?.dateTime || new Date().toISOString().slice(0, 16),
    incidentType: prefillData?.incidentType || "phishing",
    description: prefillData?.description || "",
    systemsAffected: prefillData?.systemsAffected || [],
    dataAffected: prefillData?.dataAffected || [],
    severity: prefillData?.severity || "Medium",
    actionsTaken: prefillData?.actionsTaken || [],
    anonymous: prefillData?.anonymous || false,
  });

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const INCIDENT_TYPES = useMemo(() => [
    "Phishing","Malware","Ransomware","Data Breach","Unauthorized Access",
    "Suspicious Email/Link","Insider Threat","DoS/DDoS","Other"
  ], []);

  const SYSTEMS = useMemo(() => ["Email","Workstation","Server","Website","Network","Other"], []);
  const DATA_TYPES = useMemo(() => ["Personal Data","Financial Data","Credentials","Confidential Files","Unknown"], []);
  const ACTIONS = useMemo(() => ["Disconnected device","Changed password","Reported to IT","No action taken","Other"], []);

  const COLORS = { // ✅ NEW: color palette
    mainPurple: "#711bb5",
    neonGradientStart: "#b76bff",
    neonGradientEnd: "#ff4dff",
    darkBase: "#000",
    cardStart: "#111",
    cardEnd: "#3a0044",
    text: "#fff"
  };

  const validate = () => {
  const e = {};

  // Check required fields
  if (!form.anonymous && !form.reporterName.trim()) e.reporterName = "Name is required";
  if (!form.anonymous && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email is required";
  if (!form.incidentType) e.incidentType = "Please select incident type";
  if (!form.description.trim()) e.description = "Please describe the incident";

  // Check files for size and type
  const allowed = /\.(png|jpe?g|pdf|txt|log|eml|msg)$/i;
  for (const f of files) {
    if (!allowed.test(f.name)) { 
      e.files = `Invalid file type: ${f.name}`; 
      break; 
    }
    if (f.size > 10 * 1024 * 1024) { 
      e.files = "Each file must be 10MB or smaller"; 
      break; 
    }
  }

  setErrors(e);
  return Object.keys(e).length === 0;
};


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "anonymous") { setForm(prev => ({ ...prev, [name]: checked })); return; }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiCheckbox = (e, fieldName, value) => {
    const checked = e.target.checked;
    setForm(prev => {
      const set = new Set(prev[fieldName]);
      if (checked) set.add(value); else set.delete(value);
      return { ...prev, [fieldName]: Array.from(set) };
    });
  };

  const handleFile = (e) => {
  const fl = Array.from(e.target.files || []);
  const allowed = /\.(png|jpe?g|pdf|txt|log|eml|msg)$/i;

  // Check for invalid file types
  const invalidFiles = fl.filter(f => !allowed.test(f.name));
  if (invalidFiles.length > 0) {
    setErrors(prev => ({ ...prev, files: "Invalid file type: " + invalidFiles.map(f => f.name).join(", ") }));
    return;
  }

  // Check for files too large (>10MB)
  const tooLarge = fl.filter(f => f.size > 10 * 1024 * 1024);
  if (tooLarge.length > 0) {
    setErrors(prev => ({ ...prev, files: "File too large: " + tooLarge.map(f => f.name).join(", ") }));
    return;
  }

  // ✅ Files are valid
  setFiles(fl);
  // 🔹 Correctly remove the error instead of setting undefined
  setErrors(prev => {
    const newErrors = { ...prev };
    delete newErrors.files;   // completely remove file error key
    return newErrors;
  });
};





const handleSubmit = async (ev) => {  
  ev.preventDefault();
  console.log("Submit button clicked"); // Debug

  // Validate form first
  if (!validate()) {
    console.log("Validation failed", errors);
    return;
  }

  try {
    // Use FormData to handle files
    const formData = new FormData();

    // Append normal fields
    for (const key in form) {
      if (Array.isArray(form[key])) {
        form[key].forEach(value => formData.append(key, value));
      } else if (form[key] !== undefined && form[key] !== null) {
        formData.append(key, form[key]);
      }
    }

    // Append files safely
    if (files && files.length > 0) {
      files.forEach(file => formData.append("files", file));
    }

    console.log("Sending POST request with FormData...");

    const response = await fetch("http://localhost:5000/api/incidents", {
      method: "POST",
      body: formData, // do NOT set Content-Type manually
    });

    console.log("Response received:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with an error:", errorText);
      return;
    }

    const data = await response.json();
    console.log("Response JSON:", data);

    if (!data.incidentId) {
      console.error("No incidentId received from server:", data);
      return;
    }

    // ✅ Navigate immediately — do NOT block submit
    navigate("/success", { state: { incidentId: data.incidentId, formData: form } });

    // ✅ Generate PDF asynchronously (do not block navigation)
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Incident Report", 20, 20);

      const logoImg = new Image();
      logoImg.src = logo;
      logoImg.crossOrigin = "anonymous";
      logoImg.onload = () => {
        try {
          doc.addImage(logoImg, "PNG", 160, 10, 40, 20);
        } catch (e) {
          console.warn("Failed to load logo into PDF, continuing without it.");
        }

        let y = 40;
        const addLine = (label, value) => {
          const splitText = doc.splitTextToSize(value || "N/A", 170);
          doc.text(`${label}:`, 20, y);
          y += 6;
          splitText.forEach(line => {
            doc.text(line, 25, y);
            y += 6;
          });
          y += 4;
        };

        addLine("Incident ID", data.incidentId);
        addLine("Reporter", form.anonymous ? "Anonymous" : form.reporterName);
        addLine("Email", form.email);
        addLine("Phone", form.phone);
        addLine("Organization", form.organization);
        addLine("Date/Time", new Date().toLocaleString());
        addLine("Incident Type", form.incidentType);
        addLine("Description", form.description);
        addLine("Systems Affected", form.systemsAffected.join(", "));
        addLine("Data Affected", form.dataAffected.join(", "));
        addLine("Severity", form.severity);
        addLine("Actions Taken", form.actionsTaken.join(", "));
        addLine("Attached Files", files.map(f => f.name).join(", "));

        doc.setFontSize(10);
        doc.text("© 2025 Sentinel | Sri Lanka Army IT Department", 20, 285);
        doc.text("Generated by Incident Reporting Portal", 140, 285);

        doc.save(`incident_${data.incidentId}.pdf`);
      };
    }, 100); // small timeout ensures navigation works first

  } catch (err) {
    console.error("Error during submission:", err);
  }
};









  return (
    <div style={{ minHeight: "100vh", fontFamily: 'inter', background: `linear-gradient(135deg, ${COLORS.darkBase}, ${COLORS.cardEnd})`, position: "relative", color: COLORS.text }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.65)", zIndex: 0 }} />
      <main style={{ position: "relative", zIndex: 1, padding: "28px 48px" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 18 }}>
          <img src={logo} alt="Sentinel" style={{ height: 58 }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontFamily: "Poppins, sans-serif", }}><span style={{ color: "#71b" }}>Incident Reporting</span> Portal</h1>
            <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: 16, fontWeight: 100, fontFamily: "Poppins, sans-serif", }}>Report suspicious activity, phishing, malware, or data breaches.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 }}>
          {/* LEFT COLUMN */}
          <div style={{ padding: 18, borderRadius: 12, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)", transition: "transform 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontFamily:'inter'}}>Report Details</h3>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 16, fontFamily:'inter' }}>
                <input type="checkbox" name="anonymous" checked={form.anonymous} onChange={handleChange} /> Report anonymously
              </label>
            </div>

            {!form.anonymous && (
              <>
                <label style={{ display: "block", margin: "16px 0 6px", fontSize: 16, fontFamily:'inter' }}>Full Name*</label>
                <input name="reporterName" value={form.reporterName} onChange={handleChange} className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }} />
                {errors.reporterName && <div style={{ color: "#ff9b9b", marginTop: 6 }}>{errors.reporterName}</div>}

                <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Email*</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }} />
                {errors.email && <div style={{ color: "#ff9b9b", marginTop: 6 }}>{errors.email}</div>}

                <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }} />

                <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Organization / Department</label>
                <input name="organization" value={form.organization} onChange={handleChange} className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }} />
              </>
            )}

            <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Date & Time</label>
            <input name="dateTime" value={form.dateTime} onChange={handleChange} type="datetime-local" className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }} />

            <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Type of Incident*</label>
            <select name="incidentType" value={form.incidentType} onChange={handleChange} className="glow-input" style={{ width: "95%", padding: 10, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", fontFamily: "Poppins, sans-serif" }}>
              {INCIDENT_TYPES.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>

            <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Description*</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="glow-input" style={{ width: "95%", padding: 12, borderRadius: 8, border: "1px solid #2a1230", background: "#0a0710", color: "#fff", height: "200px", fontFamily: "Poppins, sans-serif" }} />
            {errors.description && <div style={{ color: "#ff9b9b", marginTop: 6 }}>{errors.description}</div>}

            <label style={{ display: "block", margin: "12px 0 6px", fontSize: 16, fontFamily:'inter' }}>Attach files (screenshots, logs, email headers)</label>
            <label className="glow-input" style={{ cursor: "pointer", padding: "8px 12px", borderRadius: 8, background: "#711bb5", display: "inline-block", marginBottom: 6, fontFamily: 'inter' }}>
              Upload files
              <input type="file" multiple hidden onChange={handleFile} accept=".png,.jpg,.jpeg,.pdf,.txt,.log,.eml,.msg" />
            </label>
            {files.length > 0 && <div style={{ fontSize: 13, marginBottom: 6 }}>{files.map(f => f.name).join(", ")}</div>}
            {errors.files && <div style={{ color: "#ff9b9b", marginTop: 6 }}>{errors.files}</div>}
          </div>

          {/* RIGHT COLUMN */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Systems Affected */}
            <div style={{ padding: 18, borderRadius: 12, fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <MultiCheckbox label="Systems Affected" options={SYSTEMS} selectedValues={form.systemsAffected} onChange={(e, v) => handleMultiCheckbox(e, "systemsAffected", v)} />
            </div>

            {/* Data Affected */}
            <div style={{ padding: 18, borderRadius: 12,fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <MultiCheckbox label="Data Affected" options={DATA_TYPES} selectedValues={form.dataAffected} onChange={(e, v) => handleMultiCheckbox(e, "dataAffected", v)} />
            </div>

            {/* Severity */}
            <div style={{ padding: 18, borderRadius: 12, fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <label style={{ display: "block", margin: "0 0 6px", fontSize: 16 }}>Severity</label>
              <select name="severity" value={form.severity} onChange={handleChange} className="glow-input" style={{ width: "100%", padding: 8, borderRadius: 8, background: "#0a0710", color: "#fff", border: "1px solid #2a1230", fontFamily: 'inter' }}>
                {["Low","Medium","High","Critical","Unknown"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Actions Taken */}
            <div style={{ padding: 18, borderRadius: 12, fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <MultiCheckbox label="Actions Taken" options={ACTIONS} selectedValues={form.actionsTaken} onChange={(e, v) => handleMultiCheckbox(e, "actionsTaken", v)} />
            </div>

            {/* Submit Report + Privacy & Security */}
            <div style={{ padding: 18, borderRadius: 12, fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <button type="submit" disabled={Object.keys(errors).length > 0} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "none", background: COLORS.mainPurple, color: COLORS.text, fontSize: 18, fontFamily: 'inter', marginBottom: 12, cursor: "pointer", opacity: Object.keys(errors).length > 0 ? 0.6 : 1, transition: "all 0.3s ease" }} onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 12px #711bb5, 0 0 25px rgba(113,27,181,0.7)")} onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}>Submit Report</button>
              <div style={{ fontSize: 16, opacity: 0.85, fontFamily: 'inter' }}>
                <strong>Privacy & Security</strong>
                <p style={{ margin: "6px 0 0", fontSize: 15, fontFamily: 'inter' }}>Do not include passwords or authentication tokens in the description or attachments. Files are scanned and stored securely.</p>
              </div>
            </div>

            {/* Track Your Report */}
            <div style={{ padding: 18, borderRadius: 12, fontSize: 15, background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
              <div style={{ fontSize: 16, fontFamily: 'inter' }}>
                <strong>Track your report</strong>
                <p style={{ margin: "6px 0 0", fontSize: 15, fontFamily: 'inter' }}>After submission you will receive an Incident ID to follow up (if you provided contact details).</p>
              </div>
            </div>
          </aside>
        </form>

        <div style={{ marginTop: 18, padding: 14, borderRadius: 10, background: "#06020a", opacity: 0.9 }}>
          <p style={{ margin: 0, fontSize: 16, fontFamily: 'inter' }}>If this is an active attack affecting multiple users or critical systems, please also call your SOC/IT immediately.</p>
        </div>
      </main>

      <footer style={{ textAlign: "center", padding: 18, background: "#000", opacity: 0.9, marginTop: 30, fontFamily: 'inter' }}>
        <p style={{ margin: 0 }}>© 2025 Sentinel | Sri Lanka Army IT Department</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap');
        input[type=file] { color: #fff; }
        input, textarea, select, button, div, h1, h2, h3, p, label { ; transition: 0.3s, fontFamily: 'inter'; }
        input.glow-input:hover, textarea.glow-input:hover, select.glow-input:hover, label.glow-input:hover { border-color: #711bb5; box-shadow: 0 0 8px #711bb5, 0 0 15px rgba(113,27,181,0.8); }
        .form-card:hover { transform: translateY(-3px); }
        @media (max-width: 900px) { form { grid-template-columns: 1fr !important; } }
      `}</style>

      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
