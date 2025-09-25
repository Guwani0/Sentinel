import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

export default function CTDComTrend() {
  const data = [
    // intentionally uneven to show real-world spikes and dips
    { month: 'Apr', compliance: 68 }, // dip (slow month)
    { month: 'May', compliance: 83 }, // spike (campaign/drive)
    { month: 'Jun', compliance: 76 }, // drop after spike
    { month: 'Jul', compliance: 91 }, // big improvement spike
    { month: 'Aug', compliance: 77 }, // sharp dip (holiday/rollout issue)
    { month: 'Sep', compliance: 88 }, // recovery
  ];

  const target = 95; // target compliance percentage

  return (
    <div style={{ padding: 28, minHeight: '100vh', background: '#000', color: '#fff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
  <h2 style={{ color: '#9be7ff', fontFamily: 'Poppins, sans-serif' }}>Compliance Trend (Last 6 Months)</h2>

        <div style={{ marginTop: 6, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 18, borderRadius: 12 }}>
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
                <ReferenceLine y={target} stroke="#10b981" strokeDasharray="4 6" label={{ value: `Target ${target}%`, position: 'right', fill: '#a7f3d0', fontSize: 12 }} />
                <CartesianGrid strokeDasharray="3 3" stroke="#111" />
                <Tooltip />
                <Area type="monotone" dataKey="compliance" stroke="#00d4ff" fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* KPI row (moved below the chart) */}
        <div style={{ display: 'flex', gap: 12, maxWidth: 1000, margin: '12px auto' }}>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>📈 Current compliance</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>88%</div>
            <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>Last month snapshot</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>⬆ Growth (6 months)</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>+12%</div>
            <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>Apr → Sep</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#050507, #1b2430)', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#9ca3af', fontSize: 12 }}>⚠ Non-compliant users</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, marginTop: 6 }}>200</div>
            <div style={{ color: '#9ca3af', fontSize: 12, marginTop: 6 }}>Users missing policy/training</div>
          </div>
        </div>
        {/* Trends in Non-Compliance Causes (below KPIs) */}
        <div style={{ maxWidth: 1000, margin: '8px auto 24px', padding: 12, borderRadius: 8, background: 'linear-gradient(180deg,#050507,#0f1724)' }}>
          <h4 style={{ color: '#fff', margin: '0 0 8px' }}>Trends in Non-Compliance Causes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* cause: missed training */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: '0 0 260px', color: '#9ca3af' }}>Missed training deadlines</div>
              <div style={{ flex: 1, height: 14, background: '#071022', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg,#7c2bd9,#00d4ff)' }} />
              </div>
              <div style={{ width: 74, textAlign: 'right', color: '#fff', fontWeight: 700 }}>120</div>
            </div>

            {/* cause: pending policy ack */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: '0 0 260px', color: '#9ca3af' }}>Pending policy acknowledgement</div>
              <div style={{ flex: 1, height: 14, background: '#071022', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '25%', height: '100%', background: 'linear-gradient(90deg,#10b981,#34d399)' }} />
              </div>
              <div style={{ width: 74, textAlign: 'right', color: '#fff', fontWeight: 700 }}>50</div>
            </div>

            {/* cause: inactive accounts */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: '0 0 260px', color: '#9ca3af' }}>Inactive accounts</div>
              <div style={{ flex: 1, height: 14, background: '#071022', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ width: '15%', height: '100%', background: 'linear-gradient(90deg,#f97316,#fb923c)' }} />
              </div>
              <div style={{ width: 74, textAlign: 'right', color: '#fff', fontWeight: 700 }}>30</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
