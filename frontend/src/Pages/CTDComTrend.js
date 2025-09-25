import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function CTDComTrend() {
  const data = [
    { month: 'Apr', compliance: 72 },
    { month: 'May', compliance: 75 },
    { month: 'Jun', compliance: 78 },
    { month: 'Jul', compliance: 81 },
    { month: 'Aug', compliance: 84 },
    { month: 'Sep', compliance: 87 },
  ];

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
  <h2 style={{ color: '#9be7ff', fontFamily: 'Poppins, sans-serif' }}>Compliance Trend (Last 6 Months)</h2>

        <div style={{ marginTop: 18, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 18, borderRadius: 12 }}>
          <h4 style={{ color: '#fff' }}>Overall compliance %</h4>
          <div style={{ width: '100%', height: 340 }}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7c2bd9" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#bbb" />
                <YAxis stroke="#bbb" domain={[60, 100]} />
                <CartesianGrid strokeDasharray="3 3" stroke="#111" />
                <Tooltip />
                <Area type="monotone" dataKey="compliance" stroke="#00d4ff" fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
