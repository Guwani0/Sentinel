// Rewritten CTDCstmRpt.js - fixed JSX and export footer
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const sampleData = [
  { id: 1, date: new Date().toISOString(), user: 'Alice', team: 'Ops', severity: 'Low', acknowledged: 'Yes', role: 'Manager' },
  { id: 2, date: new Date(Date.now()-2*24*3600*1000).toISOString(), user: 'Bob', team: 'Eng', severity: 'High', acknowledged: 'No', role: 'Admin' },
  { id: 3, date: new Date(Date.now()-5*24*3600*1000).toISOString(), user: 'Carla', team: 'Support', severity: 'Medium', acknowledged: 'Yes', role: 'Employee' },
  { id: 4, date: new Date(Date.now()-8*24*3600*1000).toISOString(), user: 'Dan', team: 'Eng', severity: 'Low', acknowledged: 'Yes', role: 'Employee' },
  { id: 5, date: new Date(Date.now()-12*24*3600*1000).toISOString(), user: 'Eve', team: 'Ops', severity: 'High', acknowledged: 'No', role: 'Manager' },
];

export default function CTDCstmRpt() {
  const [severity, setSeverity] = useState('All');
  const [acknowledged, setAcknowledged] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [previewData, setPreviewData] = useState(sampleData);

  // Apply filters dynamically
  useEffect(() => {
    let out = sampleData;
    if (severity !== 'All') out = out.filter(r => r.severity === severity);
    if (acknowledged !== 'All') out = out.filter(r => r.acknowledged === acknowledged);
    // dateRange is a placeholder for now
    setPreviewData(out);
  }, [severity, acknowledged, dateRange]);

  // Remove ID column from export/preview headers per request; add Date column
  const headers = ['Date', 'User', 'Team', 'Severity', 'Acknowledged', 'Role'];

  const rowsForExport = previewData.map(r => ({ Date: r.date ? new Date(r.date).toLocaleDateString() : '', User: r.user, Team: r.team, Severity: r.severity, Acknowledged: r.acknowledged, Role: r.role }));

  const exportPDF = (filename = 'report.pdf') => {
    try {
      const doc = new jsPDF();
      // try using autotable plugin
    const body = previewData.map(r => [r.date ? new Date(r.date).toLocaleDateString() : '', r.user, r.team, r.severity, r.acknowledged, r.role]);
      autoTable(doc, { head: [headers], body });
      doc.save(filename);
    } catch (e) {
      const doc = new jsPDF();
      doc.text('Custom Report', 14, 20);
      doc.save(filename);
    }
  };

  const exportXLSX = (filename = 'report.xlsx') => {
    const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rowsForExport);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, filename);
  };

  // Styles
  const container = { padding: 26, minHeight: '100vh', background: '#000', color: '#fff' };
  const inner = { maxWidth: 1000, margin: '0 auto' };
  const controls = { marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' };
  const selectStyle = { padding: 8, borderRadius: 8, background: '#0b0b0b', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' };
  const btnPrimary = { padding: '8px 12px', borderRadius: 8, background: '#0ea5ff', color: '#000', fontWeight: 700, cursor: 'pointer' };
  const btnSecondary = { padding: '8px 12px', borderRadius: 8, background: '#7c3aed', color: '#fff', fontWeight: 700, cursor: 'pointer' };

  return (
    <div style={container}>
      <div style={inner}>
        <h2 style={{ color: '#9ef2ff', fontFamily: 'Poppins, sans-serif' }}>Custom Report Builder</h2>

        <div style={controls}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ marginLeft: 8, color: '#9ca3af' }}>Filters</div>
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ color: '#fff' }}>Severity Level:</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={selectStyle}>
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ color: '#fff' }}>Acknowledged:</label>
              <select value={acknowledged} onChange={e => setAcknowledged(e.target.value)} style={selectStyle}>
                <option>All</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ color: '#fff' }}>Date:</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={selectStyle}>
                <option>All</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>
          </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 12, maxWidth: 1000, margin: '16px auto 0' }}>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507,#1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>✅ Total Reports Generated</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>{previewData.length}</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507,#1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>⚠ Pending Acknowledgements</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>{previewData.filter(p => p.acknowledged === 'No').length}</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507,#1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>📊 Teams Covered</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>{new Set(previewData.map(p => p.team)).size}</div>
          </div>
        </div>

        {/* Preview card */}
        <div style={{ marginTop: 12, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 16, borderRadius: 10 }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 10 }}>Preview</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#fff' }}>
                  {headers.map(h => <th key={h} style={{ padding: '8px 10px' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {previewData.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px' }}>{r.date ? new Date(r.date).toLocaleDateString() : ''}</td>
                    <td style={{ padding: '10px' }}>{r.user}</td>
                    <td style={{ padding: '10px' }}>{r.team}</td>
                    <td style={{ padding: '10px' }}>{r.severity}</td>
                    <td style={{ padding: '10px' }}>{r.acknowledged}</td>
                    <td style={{ padding: '10px' }}>{r.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* card footer with export actions (sibling of table, not inside it) */}
          <div style={{ marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <div style={{ color: '#9ca3af', alignSelf: 'center', marginRight: 'auto' }}>📥 Export as:</div>
            <button style={{ ...btnSecondary, padding: '8px 14px' }} onClick={() => exportPDF('custom_report.pdf')}>PDF</button>
            <button style={{ ...btnPrimary, padding: '8px 14px' }} onClick={() => exportXLSX('custom_report.xlsx')}>Excel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared dropdown style
const dropdownStyle = {
  width: '100%',
  margin: '6px 0',
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #444',
  background: '#000',
  color: '#fff',
};
