import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import Header from "../Components/Header"; // ✅ Added Header

export default function CTDIncSevere() {
  const pieData = [
    { name: 'Critical', value: 45 },
    { name: 'High', value: 120 },
    { name: 'Medium', value: 320 },
    { name: 'Low', value: 215 },
  ];

  const barData = [
    { name: 'Jan', critical: 2, high: 5, medium: 12, low: 8 },
    { name: 'Feb', critical: 1, high: 8, medium: 20, low: 6 },
    { name: 'Mar', critical: 15, high: 40, medium: 90, low: 55 },
    { name: 'Apr', critical: 6, high: 15, medium: 30, low: 20 },
    { name: 'May', critical: 20, high: 45, medium: 120, low: 60 },
    { name: 'Jun', critical: 3, high: 7, medium: 40, low: 35 },
  ];

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#60a5fa'];
  const total = pieData.reduce((s, p) => s + (p.value || 0), 0);

  const DonutTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0];
    const value = item.value || 0;
    const name = item.name || '';
    const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
    return (
      <div style={{ background: '#111', padding: 8, borderRadius: 8, color: '#fff', border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontWeight: 700 }}>{name}</div>
        <div style={{ color: '#cfcfcf' }}>{value} incidents</div>
        <div style={{ marginTop: 6, color: '#a78bfa', fontWeight: 700 }}>{pct}%</div>
      </div>
    );
  };

  const rootCauses = [
    { name: 'Human Error', value: 40 },
    { name: 'System Failure', value: 30 },
    { name: 'External Attack', value: 20 },
    { name: 'Other', value: 10 },
  ];
  const ROOT_COLORS = ['#7c3aed', '#ef4444', '#f97316', '#94a3b8'];

  const avgResolutionDays = 2.3;
  const pctWithinSLA = 85;
  const openClosed = [
    { name: 'Open', value: 120 },
    { name: 'Closed', value: 580 },
  ];
  const OC_COLORS = ['#f97316', '#10b981'];

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: '#000', color: '#fff' }}>
      {/* ✅ Global Header */}
      <Header user={{ username: "Admin", role: "admin" }} /> <br />

      <h2 className="text-5xl font-bold mb-6 text-purple-400 text-left">
        Incident Severity Breakdown
      </h2>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20, marginTop: 20 }}>
          <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 16, borderRadius: 10 }}>
            <h4 style={{ color: '#fff' }}>Severity over time (stacked)</h4>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <BarChart data={barData}>
                  <XAxis dataKey="name" stroke="#bbb" />
                  <YAxis stroke="#bbb" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="low" stackId="a" fill="#60a5fa" />
                  <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="high" stackId="a" fill="#f97316" />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <h4 style={{ color: '#fff' }}>Current Distribution</h4>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} startAngle={90} endAngle={-270}>
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ color: '#fff', fontWeight: 700 }}>700 incidents</div>
              <div style={{ color: '#9ca3af', marginTop: 6 }}>Last 6 months</div>
            </div>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ maxWidth: 1100, margin: '20px auto 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 14, borderRadius: 10, color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>Avg Resolution Time</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{avgResolutionDays} days</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>Median of resolved incidents</div>
            </div>

            <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 14, borderRadius: 10, color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>% Resolved within SLA</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{pctWithinSLA}%</div>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>SLA: 7 days</div>
            </div>

            <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 12, borderRadius: 10, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 120, height: 80 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={openClosed} dataKey="value" nameKey="name" innerRadius={20} outerRadius={40} startAngle={90} endAngle={-270}>
                      {openClosed.map((entry, idx) => (
                        <Cell key={`oc-${idx}`} fill={OC_COLORS[idx % OC_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<DonutTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ color: '#e6e6e6' }}>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Open vs Closed</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{openClosed[0].value} Open</div>
                <div style={{ color: '#9ca3af', marginTop: 4 }}>{openClosed[1].value} Closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Root cause breakdown */}
        <div style={{ maxWidth: 1100, margin: '24px auto 0' }}>
          <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', padding: 16, borderRadius: 10 }}>
            <h4 style={{ color: '#fff' }}>Root Cause Breakdown</h4>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
              <div style={{ width: 260, height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={rootCauses} dataKey="value" nameKey="name" innerRadius={48} outerRadius={90} startAngle={90} endAngle={-270}>
                      {rootCauses.map((entry, idx) => (
                        <Cell key={`rc-${idx}`} fill={ROOT_COLORS[idx % ROOT_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ color: '#e6e6e6' }}>
                {rootCauses.map((r, i) => (
                  <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: ROOT_COLORS[i] }} />
                    <div style={{ minWidth: 160 }}>{r.name}</div>
                    <div style={{ color: '#fffbeb', fontWeight: 700 }}>{r.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
