import React, { useMemo, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

function exportPDF(filename, headers, rows, title) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  doc.setFontSize(18);
  doc.text(title || 'Custom Report', 40, 40);
  autoTable(doc, { head: [headers], body: rows, startY: 70, styles: { fontSize: 11 } });
  doc.save(filename);
}

function exportXLSX(filename, rows) {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  XLSX.writeFile(wb, filename);
}

export default function CTDCstmRpt() {
  // sample rows — replace with API fetch if backend available
  const sampleData = [
    { id: 1, user: 'jdoe', team: 'Alpha', severity: 'Low', acknowledged: 'Yes', role: 'Manager' },
    { id: 2, user: 'asmith', team: 'Bravo', severity: 'High', acknowledged: 'No', role: 'Admin' },
    { id: 3, user: 'bwilliams', team: 'Alpha', severity: 'Medium', acknowledged: 'Yes', role: 'Manager' },
    { id: 4, user: 'kmiller', team: 'Charlie', severity: 'Low', acknowledged: 'Yes', role: 'User' },
  ];

  const [role, setRole] = useState('All');
  const [dateRange, setDateRange] = useState('All');
  const [previewData, setPreviewData] = useState(sampleData);

  const roles = useMemo(() => ['All', ...Array.from(new Set(sampleData.map(s => s.role)))], []);

  useEffect(() => {
    let out = sampleData;
    if (role !== 'All') out = out.filter(r => r.role === role);
    // dateRange currently not applied (placeholder)
    setPreviewData(out);
  }, [role, dateRange]);

  const headers = ['ID', 'User', 'Team', 'Severity', 'Acknowledged', 'Role'];

  const rowsForExport = previewData.map(r => ({ ID: r.id, User: r.user, Team: r.team, Severity: r.severity, Acknowledged: r.acknowledged, Role: r.role }));

  const container = { padding: 26, minHeight: '100vh', background: '#000', color: '#fff' };
  const inner = { maxWidth: 1000, margin: '0 auto' };
  const controls = { marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' };
  const selectStyle = { padding: 8, borderRadius: 8, background: '#0b0b0b', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' };
  const btnPrimary = { padding: '8px 12px', borderRadius: 8, background: '#0ea5ff', color: '#000', fontWeight: 700, cursor: 'pointer' };
  const btnSecondary = { padding: '8px 12px', borderRadius: 8, background: '#7c3aed', color: '#fff', fontWeight: 700, cursor: 'pointer', marginRight: 12 };

  return (
    <div style={container}>
      <div style={inner}>
  <h2 style={{ color: '#9ef2ff', fontFamily: 'Poppins, sans-serif' }}>Custom Report Builder</h2>

        <div style={controls}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ color: '#fff' }}>Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={selectStyle}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
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

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <button style={btnSecondary} onClick={() => exportPDF((role === 'All' ? 'report' : role) + '_report.pdf', headers, previewData.map(r => [r.id, r.user, r.team, r.severity, r.acknowledged, r.role]), `Custom Report ${role === 'All' ? '' : '— ' + role}`)}>Export PDF</button>
            <button style={btnPrimary} onClick={() => exportXLSX((role === 'All' ? 'report' : role) + '_report.xlsx', rowsForExport)}>Export Excel</button>
          </div>
        </div>

        <div style={{ marginTop: 18, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 16, borderRadius: 10 }}>
          <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 10 }}>Preview</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#fff' }}>
                  <th style={{ padding: '8px 10px' }}>ID</th>
                  <th style={{ padding: '8px 10px' }}>User</th>
                  <th style={{ padding: '8px 10px' }}>Team</th>
                  <th style={{ padding: '8px 10px' }}>Severity</th>
                  <th style={{ padding: '8px 10px' }}>Acknowledged</th>
                  <th style={{ padding: '8px 10px' }}>Role</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '10px' }}>{r.id}</td>
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
        </div>
      </div>
    </div>
  );
}
