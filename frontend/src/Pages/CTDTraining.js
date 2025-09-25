import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function CTDTraining() {
  const barData = [
    { name: 'Week 1', completed: 120, pending: 30 },
    { name: 'Week 2', completed: 200, pending: 40 },
    { name: 'Week 3', completed: 240, pending: 20 },
    { name: 'Week 4', completed: 300, pending: 15 },
    { name: 'Week 5', completed: 320, pending: 10 },
    { name: 'Week 6', completed: 350, pending: 5 },
  ];

  const pieData = [
    { name: 'Completed', value: 1530 },
    { name: 'Pending', value: 120 },
  ];
  const PIE_COLORS = ['#7c2bd9', '#ffb22b'];

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
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ color: '#a78bfa', fontWeight: 700 }}>92% Completed</div>
              <div style={{ color: '#fff', marginTop: 8 }}>1530 of 1650 users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
