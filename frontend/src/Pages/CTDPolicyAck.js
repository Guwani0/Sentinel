import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CTDPolicyAck() {
  // sample weekly data for the bar chart (acknowledged vs pending)
  const weekly = [
    // non-monotonic distribution (up/down across weeks for realism)
    { week: 'Week 1', acknowledged: 210, pending: 30 },
    { week: 'Week 2', acknowledged: 145, pending: 50 },
    { week: 'Week 3', acknowledged: 260, pending: 22 },
    { week: 'Week 4', acknowledged: 190, pending: 40 },
    { week: 'Week 5', acknowledged: 235, pending: 18 },
    { week: 'Week 6', acknowledged: 175, pending: 28 },
  ];

  const COLORS = ['#7c2bd9', '#ffb22b'];

  const totals = useMemo(() => {
    const ack = weekly.reduce((s, w) => s + (w.acknowledged || 0), 0);
    const pend = weekly.reduce((s, w) => s + (w.pending || 0), 0);
    const total = ack + pend;
    return { acknowledged: ack, pending: pend, total };
  }, [weekly]);

  const pieData = [
    { name: 'Acknowledged', value: totals.acknowledged },
    { name: 'Pending', value: totals.pending },
  ];

  const pct = totals.total > 0 ? Math.round((totals.acknowledged / totals.total) * 100) : 0;

  // custom tooltip for donut: shows counts when hovering slices
  const DonutTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0];
    // item.name is either 'Acknowledged' or 'Pending'
    const value = item.value;
    const percent = totals.total > 0 ? Math.round((value / totals.total) * 100) : 0;
    const label = `${value} of ${totals.total} users`;
    return (
      <div style={{ background: '#0b0710', color: '#fff', padding: 10, borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.5)', fontSize: 13 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
        <div style={{ color: '#cfcfcf' }}>{label}</div>
        <div style={{ marginTop: 6, color: '#a78bfa', fontWeight: 700 }}>{percent}%</div>
      </div>
    );
  };

  return (
    <div style={{ padding: 30, minHeight: '100vh', background: '#000' }}>
      <h2 style={{ color: '#a78bfa', margin: '10px 0 20px 0' }}>Policy Acknowledgement Rate</h2>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, maxWidth: 1100, margin: '0 auto 18px auto', alignItems: 'stretch', paddingBottom: 12 }}>
        {/* Left: Completed vs Pending (last 6 weeks) */}
  <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', borderRadius: 12, padding: 18, boxShadow: '0 6px 20px rgba(113,27,181,0.35)', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Completed vs Pending (last 6 weeks)</div>
          <div style={{ width: '100%', height: 300, minHeight: 300 }}>
            <ResponsiveContainer>
              <BarChart data={weekly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="week" tick={{ fill: '#cfcfcf' }} />
                <YAxis tick={{ fill: '#cfcfcf' }} />
                <Tooltip wrapperStyle={{ background: '#111' }} />
                <Bar dataKey="acknowledged" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="pending" stackId="a" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Overall Completion donut */}
  <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', borderRadius: 12, padding: 18, boxShadow: '0 6px 20px rgba(113,27,181,0.35)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Overall Completion</div>
          <div style={{ width: 260, height: 260, minWidth: 200, minHeight: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={72} outerRadius={100} dataKey="value" startAngle={90} endAngle={-270}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12, color: '#fff', fontSize: 20, fontWeight: 700 }}>
            {pct}% Completed
          </div>
          {/* Totals are shown in the donut tooltip on hover — improves visual cleanliness */}
        </div>
      </div>
  {/* Export buttons removed per request */}
      

      

      {/* Pending users / group counts under the charts */}
  <div style={{ maxWidth: 1100, marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, margin: '36px auto 0', alignItems: 'stretch' }}>
        {/* Left: Top 5 users pending table */}
  <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', borderRadius: 12, padding: 14, color: '#fff', boxShadow: '0 6px 20px rgba(113,27,181,0.15)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 180, overflow: 'hidden' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Top 5 users not yet acknowledged</div>
          {/* sample pending users - replace with backend data when available */}
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e6e6e6' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>User</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Role</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Pending Since</th>
              </tr>
            </thead>
            <tbody>
              {samplePendingUsers.slice(0, 5).map((u, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '10px 6px' }}>{u.name}</td>
                  <td style={{ padding: '10px 6px', color: '#cfcfcf' }}>{u.role}</td>
                  <td style={{ padding: '10px 6px', color: '#cfcfcf' }}>{u.pendingSince}</td>
                </tr>
              ))}
              {samplePendingUsers.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: 12, color: '#999' }}>No pending users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right: Group counts summary */}
  <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', borderRadius: 12, padding: 16, color: '#fff', boxShadow: '0 6px 20px rgba(113,27,181,0.15)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 140, overflow: 'hidden' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Pending by group</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sampleGroupCounts.map((g, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                <div style={{ color: '#e6e6e6' }}>{g.role}</div>
                <div style={{ color: '#ffb22b', fontWeight: 700 }}>{g.pending}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// sample data used for table and groups; replace with API data when wired
const samplePendingUsers = [
  { name: 'Alice Thompson', role: 'Manager', pendingSince: '2025-09-02' },
  { name: 'Bob Martin', role: 'Employee', pendingSince: '2025-09-05' },
  { name: 'Carla Ruiz', role: 'Employee', pendingSince: '2025-09-07' },
  { name: 'Daniel Kim', role: 'Manager', pendingSince: '2025-09-09' },
  { name: 'Eve Park', role: 'Employee', pendingSince: '2025-09-11' },
  { name: 'Frank Li', role: 'Contractor', pendingSince: '2025-09-12' },
];

const sampleGroupCounts = [
  { role: 'Managers', pending: 50 },
  { role: 'Employees', pending: 110 },
  { role: 'Contractors', pending: 12 },
];
