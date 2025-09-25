import React, { useState } from 'react';

function downloadCSV(filename, rows) {
  const csvContent = [Object.keys(rows[0]).join(','), ...rows.map(r => Object.values(r).join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CTDCstmRpt() {
  const [filters, setFilters] = useState({ team: 'All', severity: 'All' });

  const sampleData = [
    { id: 1, user: 'jdoe', team: 'Alpha', severity: 'Low', acknowledged: 'Yes' },
    { id: 2, user: 'asmith', team: 'Bravo', severity: 'High', acknowledged: 'No' },
    { id: 3, user: 'bwilliams', team: 'Alpha', severity: 'Medium', acknowledged: 'Yes' },
  ];

  const filtered = sampleData.filter(row => (filters.team === 'All' || row.team === filters.team) && (filters.severity === 'All' || row.severity === filters.severity));

  return (
    <div style={{ padding: 26, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ color: '#c7f9ff', fontFamily: 'Poppins, sans-serif' }}>Custom Report Builder</h2>

        <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
          <select value={filters.team} onChange={e => setFilters({...filters, team: e.target.value})} style={{ padding: 8, borderRadius: 8 }}>
            <option>All</option>
            <option>Alpha</option>
            <option>Bravo</option>
          </select>

          <select value={filters.severity} onChange={e => setFilters({...filters, severity: e.target.value})} style={{ padding: 8, borderRadius: 8 }}>
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button style={{ padding: '8px 12px', borderRadius: 8 }} onClick={() => downloadCSV('custom-report.csv', filtered)}>Export CSV</button>
        </div>

        <div style={{ marginTop: 18, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 16, borderRadius: 10 }}>
          <h4 style={{ color: '#fff' }}>Preview</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th>ID</th><th>User</th><th>Team</th><th>Severity</th><th>Acknowledged</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <td>{r.id}</td>
                    <td>{r.user}</td>
                    <td>{r.team}</td>
                    <td>{r.severity}</td>
                    <td>{r.acknowledged}</td>
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
