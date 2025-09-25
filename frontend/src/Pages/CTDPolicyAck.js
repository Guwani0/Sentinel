import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

export default function CTDPolicyAck() {
  const data = [
    { name: 'Acknowledged', value: 1340 },
    { name: 'Pending', value: 160 },
  ];

  const COLORS = ['#7c2bd9', '#ffb22b'];

  return (
    <div style={{ padding: 30, minHeight: '100vh', background: '#000' }}>
      <div style={{ maxWidth: 420, margin: '20px auto', padding: 20 }}>
        {/* header removed intentionally to declutter UI */}

        <div style={{ background: 'linear-gradient(180deg,#0b0410 0%, #2a0033 100%)', borderRadius: 12, padding: 18, boxShadow: '0 6px 20px rgba(113,27,181,0.35)' }}>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={72}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 12, background: COLORS[0], borderRadius: 3 }} />
              <div style={{ color: '#a78bfa' }}>Acknowledged</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 12, background: COLORS[1], borderRadius: 3 }} />
              <div style={{ color: '#ffb22b' }}>Pending</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 18, color: '#fff', fontSize: 20, fontWeight: 700 }}>
            92% (1340/1500 users)
          </div>
        </div>
      </div>
    </div>
  );
}
