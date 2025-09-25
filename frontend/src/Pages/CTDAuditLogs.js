import React, { useEffect, useState, useRef, useMemo } from 'react';
import { FaHistory, FaRegCalendarAlt } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

const CTDAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [actor, setActor] = useState('');
  const [action, setAction] = useState('');
  const [actorOptions, setActorOptions] = useState([
    'Admins',
    'Managers',
    'Employees',
    'System',
    'External Integrations'
  ]);
  const [actionOptions, setActionOptions] = useState([
    'Authentication Events: Login',
    'Authentication Events: Logout',
    'Authentication Events: Failed Login',
    'Authentication Events: Password Reset',
    'Policy Actions: Policy Created',
    'Policy Actions: Policy Updated',
    'Policy Actions: Policy Deleted',
    'Policy Actions: Policy Assigned',
    'Training Events: Module Added',
    'Training Events: Module Updated',
    'Training Events: Completion Recorded',
    'User & Role Management: User Created',
    'User & Role Management: User Updated',
    'User & Role Management: Role Assigned',
    'User & Role Management: Role Revoked',
    'Incidents: Incident Reported',
    'Incidents: Severity Updated',
    'Incidents: Incident Closed',
    'System Settings: Integration Enabled/Disabled',
    'System Settings: Theme Changed',
    'System Settings: Settings Updated'
  ]);
  const [q, setQ] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [loading, setLoading] = useState(false);
  const startRef = useRef(null);
  const endRef = useRef(null);

  // small client-side fallback sample data for preview when backend is empty/unreachable
  const sampleEvents = useMemo(() => ([
    { _id: 's1', timestamp: new Date().toISOString(), actor: 'Admins', action: 'Authentication Events: Login', target: 'admin-console', details: { ip: '10.0.0.1' } },
    { _id: 's2', timestamp: new Date(Date.now()-3600*1000).toISOString(), actor: 'Managers', action: 'Policy Actions: Policy Created', target: 'Policy A', details: {} },
    { _id: 's3', timestamp: new Date(Date.now()-2*3600*1000).toISOString(), actor: 'Employees', action: 'Training Events: Completion Recorded', target: 'Course 101', details: { score: 95 } },
    { _id: 's4', timestamp: new Date(Date.now()-24*3600*1000).toISOString(), actor: 'External Integrations', action: 'System Settings: Integration Enabled/Disabled', target: 'Slack', details: {} },
    { _id: 's5', timestamp: new Date(Date.now()-3*24*3600*1000).toISOString(), actor: 'System', action: 'Authentication Events: Failed Login', target: 'user@example.com', details: { reason: 'wrong password' } }
  ]), []);

  // Use fallback sampleEvents when logs from backend are empty
  const workingLogs = (logs && logs.length > 0) ? logs : sampleEvents;

  // client-side filtered preview (updates as filters change)
  const filteredLogs = useMemo(() => {
    if (!workingLogs || workingLogs.length === 0) return [];
    const qLower = (q || '').trim().toLowerCase();
    const startTs = start ? new Date(start).setHours(0,0,0,0) : null;
    const endTs = end ? new Date(end).setHours(23,59,59,999) : null;
    return workingLogs.filter(l => {
      if (actor && l.actor !== actor) return false;
      if (action && !(l.action || '').toString().includes(action)) return false;
      if (qLower) {
        const hay = `${l.actor || ''} ${l.action || ''} ${l.target || ''} ${JSON.stringify(l.details || {})}`.toLowerCase();
        if (!hay.includes(qLower)) return false;
      }
      if (startTs || endTs) {
        const ts = l.timestamp ? new Date(l.timestamp).getTime() : null;
        if (startTs && ts !== null && ts < startTs) return false;
        if (endTs && ts !== null && ts > endTs) return false;
      }
      return true;
    });
  }, [workingLogs, actor, action, q, start, end]);

  // KPI computations (based on filtered preview)
  const kpis = useMemo(() => {
    const totalEvents = filteredLogs.length;
    const criticalKeywords = ['Failed Login', 'Policy Deleted', 'Incident Reported', 'Incident Closed', 'Severity Updated'];
    const criticalEvents = filteredLogs.reduce((acc, l) => {
      const actionText = (l.action || '').toString();
      return acc + (criticalKeywords.some(k => actionText.includes(k)) ? 1 : 0);
    }, 0);
    const actorCounts = filteredLogs.reduce((acc, l) => {
      const a = l.actor || 'Unknown';
      acc[a] = (acc[a] || 0) + 1;
      return acc;
    }, {});
    let mostActiveUser = '—';
    let maxCount = 0;
    Object.entries(actorCounts).forEach(([u, c]) => {
      if (c > maxCount) { maxCount = c; mostActiveUser = u; }
    });
    return { totalEvents, criticalEvents, mostActiveUser };
  }, [filteredLogs]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (actor) params.set('actor', actor);
      if (action) params.set('action', action);
      if (q) params.set('q', q);
      if (start) params.set('start', start);
      if (end) params.set('end', end);

      const res = await fetch(`${API_BASE}/audit-logs?${params.toString()}`);
      const data = await res.json();
      setLogs(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('fetchLogs error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // fetch dropdown options once
    (async function loadDropdowns(){
      try {
        const [aRes, actRes] = await Promise.all([
          fetch(`${API_BASE}/audit-logs/actors`),
          fetch(`${API_BASE}/audit-logs/actions`),
        ]);
        if (aRes.ok) {
          const fetched = await aRes.json();
          // merge unique actors preserving our core list first
          const merged = Array.from(new Set([...
            ['Admins','Managers','Employees','System','External Integrations'],
            ...(Array.isArray(fetched) ? fetched : [])
          ].flat()));
          setActorOptions(merged);
        }
        if (actRes.ok) {
          const fetchedAct = await actRes.json();
          const mergedAct = Array.from(new Set([...
            [
              'Authentication Events: Login',
              'Authentication Events: Logout',
              'Authentication Events: Failed Login',
              'Authentication Events: Password Reset',
              'Policy Actions: Policy Created',
              'Policy Actions: Policy Updated',
              'Policy Actions: Policy Deleted',
              'Policy Actions: Policy Assigned',
              'Training Events: Module Added',
              'Training Events: Module Updated',
              'Training Events: Completion Recorded',
              'User & Role Management: User Created',
              'User & Role Management: User Updated',
              'User & Role Management: Role Assigned',
              'User & Role Management: Role Revoked',
              'Incidents: Incident Reported',
              'Incidents: Severity Updated',
              'Incidents: Incident Closed',
              'System Settings: Integration Enabled/Disabled',
              'System Settings: Theme Changed',
              'System Settings: Settings Updated'
            ],
            ...(Array.isArray(fetchedAct) ? fetchedAct : [])
          ].flat()));
          setActionOptions(mergedAct);
        }
      } catch (err) {
        console.debug('Could not load actor/action lists', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const applyFilters = () => {
    setPage(1);
    fetchLogs();
  };

  const clearFilters = () => {
    setActor('');
    setAction('');
    setQ('');
    setStart('');
    setEnd('');
    setPage(1);
    fetchLogs();
  };

  const downloadCSV = () => {
    // Prefer exporting the filtered preview (what the user sees). Fall back to workingLogs (seed/sample) if no filtered results.
    const source = (filteredLogs && filteredLogs.length > 0) ? filteredLogs : (workingLogs && workingLogs.length > 0 ? workingLogs : []);
    if (!source || source.length === 0) return;
    const headers = ['Timestamp','Actor','Action','Target','Details'];
    const rows = source.map(l => [l.timestamp ? new Date(l.timestamp).toLocaleString() : '', l.actor || '', l.action || '', l.target || '', JSON.stringify(l.details || '')]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const seedBackend = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/audit-logs/seed`, { method: 'POST' });
      if (res.ok) {
        // reload dropdowns and logs
        const [aRes, actRes] = await Promise.all([
          fetch(`${API_BASE}/audit-logs/actors`),
          fetch(`${API_BASE}/audit-logs/actions`),
        ]);
        if (aRes.ok) {
          const fetched = await aRes.json();
          const merged = Array.from(new Set([...
            ['Admins','Managers','Employees','System','External Integrations'],
            ...(Array.isArray(fetched) ? fetched : [])
          ].flat()));
          setActorOptions(merged);
        }
        if (actRes.ok) {
          const fetchedAct = await actRes.json();
          const mergedAct = Array.from(new Set([...
            [
              'Authentication Events: Login',
              'Authentication Events: Logout',
              'Authentication Events: Failed Login',
              'Authentication Events: Password Reset',
              'Policy Actions: Policy Created',
              'Policy Actions: Policy Updated',
              'Policy Actions: Policy Deleted',
              'Policy Actions: Policy Assigned',
              'Training Events: Module Added',
              'Training Events: Module Updated',
              'Training Events: Completion Recorded',
              'User & Role Management: User Created',
              'User & Role Management: User Updated',
              'User & Role Management: Role Assigned',
              'User & Role Management: Role Revoked',
              'Incidents: Incident Reported',
              'Incidents: Severity Updated',
              'Incidents: Incident Closed',
              'System Settings: Integration Enabled/Disabled',
              'System Settings: Theme Changed',
              'System Settings: Settings Updated'
            ],
            ...(Array.isArray(fetchedAct) ? fetchedAct : [])
          ].flat()));
          setActionOptions(mergedAct);
        }
        setPage(1);
        await fetchLogs();
        try { alert('Seed completed successfully.'); } catch (e) { console.log('Seed completed.'); }
        return true;
      } else {
        console.warn('Seed failed', res.status);
        try { alert('Seed failed: ' + res.status); } catch (e) { console.warn('Seed failed'); }
        return false;
      }
    } catch (err) {
      console.error('seedBackend error', err);
    } finally {
      setLoading(false);
    }
  };

  // Theme helpers
  const cardStyle = {
    background: 'linear-gradient(180deg, rgba(22,8,52,0.95), rgba(9,4,20,0.72))',
    padding: 22,
    borderRadius: 12,
    border: '1px solid rgba(124,58,237,0.12)',
    boxShadow: '0 10px 40px rgba(124,58,237,0.14), inset 0 1px 0 rgba(255,255,255,0.02)'
  };

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: 10,
    background: '#060606',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.06)',
    minWidth: 140,
    transition: 'box-shadow 150ms ease, transform 120ms ease',
    boxShadow: '0 6px 18px rgba(11,7,23,0.45)'
  };

  // button styles (reused)
  const buttonPrimary = {
    background: 'linear-gradient(90deg,#8b5cf6,#c084fc)',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: 14,
    border: 'none',
    boxShadow: '0 14px 36px rgba(124,58,237,0.28)',
    cursor: 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease'
  };

  const buttonSecondary = {
    background: 'linear-gradient(90deg,#5b21b6,#7c3aed)',
    color: '#ffffff',
    padding: '10px 18px',
    borderRadius: 12,
    border: '1px solid rgba(124,58,237,0.18)',
    boxShadow: '0 10px 28px rgba(92,51,165,0.18)',
    cursor: 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease'
  };

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
        <h2 style={{ color: '#a78bfa', fontFamily: 'Poppins, sans-serif', margin: 0 }}>Audit Logs</h2>
      </div>

      {/* Filters card */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={actor} onChange={e => setActor(e.target.value)} style={{ ...inputStyle, paddingRight: 18 }}>
            <option value="">All actors</option>
            {actorOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={action} onChange={e => setAction(e.target.value)} style={{ ...inputStyle, paddingRight: 18 }}>
            <option value="">All actions</option>
            {actionOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          {/* Date range */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', minWidth: 0 }}>
            <label style={{ color: '#cfcfcf', fontSize: 13 }}>From</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input ref={startRef} type="date" value={start} onChange={e => setStart(e.target.value)} style={{ ...inputStyle, padding: 8 }} />
              <button onClick={() => { if (startRef.current) { if (startRef.current.showPicker) startRef.current.showPicker(); startRef.current.focus(); } }} aria-label="Open from calendar" style={{ background: 'transparent', border: 'none', color: '#d8c7ff', cursor: 'pointer', padding: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><FaRegCalendarAlt /></button>
            </div>

            <label style={{ color: '#cfcfcf', fontSize: 13, marginLeft: 10 }}>To</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input ref={endRef} type="date" value={end} onChange={e => setEnd(e.target.value)} style={{ ...inputStyle, padding: 8 }} />
              <button onClick={() => { if (endRef.current) { if (endRef.current.showPicker) endRef.current.showPicker(); endRef.current.focus(); } }} aria-label="Open to calendar" style={{ background: 'transparent', border: 'none', color: '#d8c7ff', cursor: 'pointer', padding: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><FaRegCalendarAlt /></button>
            </div>

          </div>

          {/* Search row under actor select (full-width on small screens) */}
          <div style={{ marginTop: 10, display: 'flex', minWidth: 0 }}>
            <div style={{ flex: '1 1 100%', minWidth: 0 }}>
              <input placeholder="Search..." value={q} onChange={e => setQ(e.target.value)} style={{ ...inputStyle, width: '100%', minWidth: 120, boxShadow: '0 8px 26px rgba(124,58,237,0.06)' }} />
            </div>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Apply button removed per UX request: filters apply reactively or via Clear for reset */}
            <button onClick={clearFilters} style={{ background: 'linear-gradient(90deg,#8b5cf6,#c084fc)', color: '#ffffff', padding: '12px 20px', borderRadius: 14, border: 'none', boxShadow: '0 14px 36px rgba(124,58,237,0.28)', cursor: 'pointer' }}>Clear</button>
            <button onClick={downloadCSV}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 44px rgba(124,58,237,0.34)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = buttonSecondary.boxShadow; }}
              style={buttonSecondary}
            >Export CSV</button>
            {/* Seed button removed (dev-only) */}
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ marginTop: 20, display: 'flex', gap: 12, marginBottom: 12 }}>
        <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ color: '#cfcfcf', fontSize: 13 }}>Total Events</div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{kpis.totalEvents} this page</div>
        </div>
        <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ color: '#cfcfcf', fontSize: 13 }}>Critical Events</div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>{kpis.criticalEvents}</div>
        </div>
        <div style={{ ...cardStyle, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ color: '#cfcfcf', fontSize: 13 }}>Most Active User</div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{kpis.mostActiveUser}</div>
        </div>
      </div>

      {/* Events table card */}
      <div style={{ ...cardStyle }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <FaHistory style={{ color: '#e9d5ff', fontSize: 18 }} />
          <strong style={{ color: '#fff', fontSize: 16 }}>Events</strong>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 760 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <th style={{ padding: '12px 10px', color: '#bfbfbf' }}>Timestamp</th>
                <th style={{ padding: '12px 10px', color: '#bfbfbf' }}>Actor</th>
                <th style={{ padding: '12px 10px', color: '#bfbfbf' }}>Action</th>
                <th style={{ padding: '12px 10px', color: '#bfbfbf' }}>Target</th>
                <th style={{ padding: '12px 10px', color: '#bfbfbf' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: 28, color: '#9a9a9a' }}>No events found for current filters.</td>
                </tr>
              )}
              {filteredLogs.map((l, idx) => (
                <tr key={l._id || idx} style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                  <td style={{ padding: '12px 10px', color: '#e6e6e6' }}>{l.timestamp ? new Date(l.timestamp).toLocaleString() : '-'}</td>
                  <td style={{ padding: '12px 10px', color: '#e6e6e6' }}>{l.actor}</td>
                  <td style={{ padding: '12px 10px', color: '#e6e6e6' }}>{l.action}</td>
                  <td style={{ padding: '12px 10px', color: '#e6e6e6' }}>{l.target}</td>
                  <td style={{ padding: '12px 10px', color: '#cfcfcf', fontSize: 13, maxWidth: 420 }}>{l.details ? JSON.stringify(l.details) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
          <div style={{ color: '#bfbfbf' }}>Previewing {filteredLogs.length} (filtered); {workingLogs.length} loaded locally · {total} total on server</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} style={{ background: 'transparent', color: page <= 1 ? '#666' : '#fff', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>Prev</button>
            <div style={{ padding: '8px 12px', background: '#060606', borderRadius: 8, color: '#ddd' }}>{page} / {Math.max(1, Math.ceil(total / limit))}</div>
            <button disabled={page >= Math.ceil(total / limit)} onClick={() => setPage(p => Math.min(Math.ceil(total / limit), p + 1))} style={{ background: 'transparent', color: page >= Math.ceil(total / limit) ? '#666' : '#fff', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTDAuditLogs;

