import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from "../Components/Header"; 

export default function ReportSavedPage() {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState({ type: "All", severity: "All", status: "All" });
  const [selectedIncident, setSelectedIncident] = useState(null);
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [newReportsCount, setNewReportsCount] = useState(0);

  const COLORS = {
    mainPurple: "#711bb5",
    neonGradientStart: "#b76bff",
    neonGradientEnd: "#ff4dff",
    darkBase: "#000",
    cardStart: "#111",
    cardEnd: "#3a0044",
    text: "#fff",
  };

  const severityColors = {
    Low: "#4caf50",
    Medium: "#ffb300",
    High: "#ff7043",
    Critical: "#f44336",
    Unknown: "#9e9e9e",
  };

    const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Colombo",
  };
  return new Date(dateStr).toLocaleString("en-GB", options);
};


  const markAsSolved = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/incidents/solve/${id}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to mark incident as solved");
      const updatedIncident = await response.json();

      // Update local state
      setIncidents((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status: "Solved" } : i))
      );
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/incidents");
        if (!response.ok) throw new Error("Failed to fetch incidents");
        const data = await response.json();
        setIncidents(data); 
      } catch (err) {
        console.error("Error fetching incidents:", err);
      }
    };
    fetchIncidents();
  }, []);
  

  const filteredIncidents = useMemo(() => {
  return incidents
   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .filter((i) => {
    const matchesType = filter.type === "All" || i.incidentType === filter.type;
    const matchesSeverity = filter.severity === "All" || i.severity === filter.severity;
    const matchesStatus = filter.status === "All" || i.status === filter.status;
    const matchesSearch = searchTerm === "" || i._id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSeverity && matchesStatus && matchesSearch;
  });
}, [filter, incidents, searchTerm]);



  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "inter",
        background: `linear-gradient(135deg, ${COLORS.darkBase}, ${COLORS.cardEnd})`,
        color: COLORS.text,
        padding: "28px 48px",
      }}
    >
      {/* Header */}
      <Header />
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 25 }}>
        <div>
          <h1 className="text-4xl font-bold text-purple-400 mb-4 mt-7"> Reported Incidents
          </h1>
          <p style={{ margin: "6px 0 0", opacity: 0.8, fontSize: 16, fontWeight: 100 }}>
            Review, filter, and manage all submitted incidents.
          </p>
        </div>
      </div>

      {/* Filters */}
     <div
  style={{
    display: "flex",
    gap: 20,
    marginBottom: 20,
    background: "#371f37ff", // Tailwind's gray-800
    padding: 16,
    borderRadius: 12,
  }}
>
        <select
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          style={{
            padding: 8,
            borderRadius: 8,
            background: "#0a0710",
            color: "#fff",
            border: "1px solid #2a1230",
          }}
        >
          <option>All</option>
          <option value="phishing">Phishing</option>
          <option value="malware">Malware</option>
          <option value="data breach">Data Breach</option>
          <option value="ransomware">Ransomware</option>
          <option value="unauthorized access">unauthorized access</option>
          <option value="suspicious access">suspicious access</option>
          <option value="insider threat">insider threat</option>
          <option value="Dos/Ddos">Dos/Ddos</option>
          <option value="other">other</option>
        </select>

        <select
          value={filter.severity}
          onChange={(e) => setFilter({ ...filter, severity: e.target.value })}
          style={{
            padding: 8,
            borderRadius: 8,
            background: "#0a0710",
            color: "#fff",
            border: "1px solid #2a1230",
          }}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
          <option>Unknown</option>
        </select>

        <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            style={{
            padding: 8,
            borderRadius: 8,
            background: "#0a0710",
            color: "#fff",
            border: "1px solid #2a1230",
        }}
>
            <option>All</option>
            <option>Unsolved</option>
            <option>Solved</option>
        </select>

        <input
            type="text"
            placeholder="Search by Incident ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
            padding: 8,
            borderRadius: 8,
            background: "#0a0710",
            color: "#fff",
            border: "1px solid #2a1230",
            width: 200,         // ✅ reduce width
            marginLeft: "auto",
            }}
        />

      </div>

      {/* Incident Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: COLORS.mainPurple }}>
            <th style={{ padding: 12, textAlign: "left" }}>Incident ID</th>
            <th style={{ padding: 12, textAlign: "left" }}>Reporter</th>
            <th style={{ padding: 12, textAlign: "left" }}>Type</th>
            <th style={{ padding: 12, textAlign: "left" }}>Severity</th>
            <th style={{ padding: 12, textAlign: "left" }}>Date</th>
            <th style={{ padding: 12, textAlign: "left" }}>Status</th>
            <th style={{ padding: 12, textAlign: "left" }}>Report</th>
          </tr>
        </thead>
        <tbody>
          {filteredIncidents.map((i) => (
            <tr
              key={i._id}
              style={{
                background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`,
                borderBottom: "1px solid #333",
              }}
            >
              <td style={{ padding: 12 }}>{i._id}</td>
              <td style={{ padding: 12 }}>{i.reporterName}</td>
              <td style={{ padding: 12, textTransform: "capitalize" }}>{i.incidentType}</td>
              <td style={{ padding: 12, color: severityColors[i.severity] || "#fff" }}>{i.severity}</td>
              <td style={{ padding: 12 }}>{formatDate(i.createdAt)}</td>
    
  <td style={{ padding: 12 }}>
  {/* ✅ NEW: Toggle Solved/Unsolved button */}
  <button
  onClick={async () => {
    try {
      // Call backend to toggle status
      const response = await fetch(`http://localhost:5000/api/incidents/solve/${i._id}`, {
        method: "PATCH",
      });
      const data = await response.json();
      if (data.success) {
        // Update local state with new status from backend
        setIncidents((prev) =>
          prev.map((inc) => (inc._id === i._id ? { ...inc, status: data.incident.status } : inc))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  }}
  style={{
    padding: "4px 10px",
    borderRadius: 6,
    border: "none",
    background: i.status === "Solved" ? "#28a745" : "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
    fontSize: 12,
  }}
>
  {i.status === "Solved" ? "Solved" : "Unsolved"}
</button>
</td>

<td style={{ padding: 12 }}>
  <button
    onClick={async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/incidents/${i._id}`);
        const data = await res.json();
        setSelectedIncident(data); // Show modal instead of navigating
      } catch (err) {
        console.error("Failed to fetch incident:", err);
      }
    }}
    style={{
      padding: "6px 12px",
      borderRadius: 6,
      border: "none",
      background: "#711bb5",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    View
    </button>
    </td>
    </tr>
    ))}
    </tbody>
    </table>

      {/* Modal */}
      {selectedIncident && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedIncident(null)}
        >
          <div
            style={{
              background: `linear-gradient(180deg, ${COLORS.cardStart}, ${COLORS.cardEnd})`,
              padding: 20,
              borderRadius: 12,
              minWidth: "400px",
              maxWidth: "600px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Incident Details</h2>
            <p><strong>ID:</strong> {selectedIncident._id}</p>
            <p><strong>Reporter:</strong> {selectedIncident.reporterName}</p>
            <p><strong>Email:</strong> {selectedIncident.email}</p>
            <p><strong>Type:</strong> {selectedIncident.incidentType}</p>
            <p><strong>Severity:</strong> {selectedIncident.severity}</p>
            <p><strong>Date:</strong> {formatDate(selectedIncident.createdAt)}</p>
            <p><strong>Status:</strong> {selectedIncident.status}</p>

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button
                onClick={() => setSelectedIncident(null)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: COLORS.mainPurple,
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
