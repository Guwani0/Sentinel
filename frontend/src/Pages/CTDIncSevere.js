import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function CTDIncSevere() {
  const pieData = [
    { name: 'Critical', value: 45 },
    { name: 'High', value: 120 },
    { name: 'Medium', value: 320 },
    { name: 'Low', value: 215 },
  ];

  const barData = [
    { name: 'Jan', critical: 5, high: 12, medium: 30, low: 20 },
    { name: 'Feb', critical: 4, high: 18, medium: 28, low: 22 },
    { name: 'Mar', critical: 6, high: 20, medium: 40, low: 30 },
    { name: 'Apr', critical: 10, high: 25, medium: 45, low: 35 },
    { name: 'May', critical: 8, high: 22, medium: 60, low: 40 },
    { name: 'Jun', critical: 12, high: 23, medium: 60, low: 48 },
  ];

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#60a5fa'];

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ color: '#ffb86b', fontFamily: 'Poppins, sans-serif' }}>Incident Severity Breakdown</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20, marginTop: 20 }}>
          <div style={{ background: 'linear-gradient(180deg,#050507, #2b0520)', padding: 16, borderRadius: 10 }}>
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

          <div style={{ background: 'linear-gradient(180deg,#050507, #2b0520)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <h4 style={{ color: '#fff' }}>Current Distribution</h4>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} startAngle={90} endAngle={-270}>
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ color: '#fff', fontWeight: 700 }}>700 incidents</div>
              <div style={{ color: '#9ca3af', marginTop: 6 }}>Last 6 months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
