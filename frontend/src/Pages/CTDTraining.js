import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function CTDTraining() {
  // Non-monotonic distribution: values go up and down to avoid a clear increasing pattern
  const barData = [
    { name: 'Week 1', completed: 180, pending: 25 },
    { name: 'Week 2', completed: 145, pending: 60 },
    { name: 'Week 3', completed: 210, pending: 30 },
    { name: 'Week 4', completed: 190, pending: 45 },
    { name: 'Week 5', completed: 225, pending: 20 },
    { name: 'Week 6', completed: 205, pending: 35 },
  ];

  const pieData = [
    { name: 'Completed', value: 1530 },
    { name: 'Pending', value: 120 },
  ];
  const PIE_COLORS = ['#7c2bd9', '#ffb22b'];

  const total = pieData.reduce((s, p) => s + p.value, 0);

  function DonutTooltip({ active, payload, total }) {
    if (!active || !payload || !payload.length) return null;
    const slice = payload[0];
    const value = slice.value || 0;
    const name = slice.name || '';
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
    return (
      <div style={{ background: '#0b0710', color: '#fff', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontWeight: 700 }}>{name}: {value} users ({pct}%)</div>
        <div style={{ fontSize: 12, color: '#cfcfcf', marginTop: 4 }}>{value} of {total} users</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 30, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
  <h2 style={{ color: '#a78bfa', fontFamily: 'Poppins, sans-serif' }}>Training Completion Statistics</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, marginTop: 18 }}>
          <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 18, borderRadius: 12 }}>
            <h4 style={{ color: '#fff' }}>Completed vs Pending (last 6 weeks)</h4>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#bbb" />
                  <YAxis stroke="#bbb" />
                  <Tooltip />
                  <Bar dataKey="completed" stackId="a" fill="#7c2bd9" />
                  <Bar dataKey="pending" stackId="a" fill="#ffb22b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 18, borderRadius: 12, textAlign: 'center' }}>
            <h4 style={{ color: '#fff' }}>Overall Completion</h4>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={90} dataKey="value" startAngle={90} endAngle={-270}>
                    {pieData.map((entry, i) => (
                      <Cell key={`c-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={(props) => <DonutTooltip {...props} total={total} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ color: '#a78bfa', fontWeight: 700 }}>92% Completed</div>
              {/* totals are now shown on hover over the donut via the Tooltip */}
            </div>
          </div>
        </div>

        {/* Mini table: top 5 users with oldest pending deadlines */}
        <div style={{ maxWidth: 1000, margin: '18px auto 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
            <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 16, borderRadius: 12 }}>
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Top 5 users pending training (oldest)</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#e6e6e6' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th style={{ padding: '8px 6px' }}>User</th>
                    <th style={{ padding: '8px 6px' }}>Role</th>
                    <th style={{ padding: '8px 6px' }}>Pending Since</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.slice(0, 5).map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '10px 6px' }}>{u.name}</td>
                      <td style={{ padding: '10px 6px', color: '#cfcfcf' }}>{u.role}</td>
                      <td style={{ padding: '10px 6px', color: '#cfcfcf' }}>{u.pendingSince}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 16, borderRadius: 12 }}>
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Summary</div>
              <div style={{ color: '#cfcfcf' }}>Total pending: <span style={{ color: '#ffb22b', fontWeight: 700 }}>120</span></div>
              <div style={{ marginTop: 8, color: '#cfcfcf' }}>Longest pending: <span style={{ color: '#ffb22b', fontWeight: 700 }}>2025-09-02</span></div>
            </div>
          </div>
        </div>

        {/* export buttons removed per design: exports are hidden for training cards */}
      </div>
    </div>
  );
}

const pendingUsers = [
  { name: 'Michael Scott', role: 'Manager', pendingSince: '2025-08-01' },
  { name: 'Pam Beesly', role: 'Employee', pendingSince: '2025-08-15' },
  { name: 'Jim Halpert', role: 'Employee', pendingSince: '2025-08-20' },
  { name: 'Dwight Schrute', role: 'Manager', pendingSince: '2025-08-25' },
  { name: 'Angela Martin', role: 'Employee', pendingSince: '2025-09-02' },
  { name: 'Stanley Hudson', role: 'Employee', pendingSince: '2025-09-10' },
];
