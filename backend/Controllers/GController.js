const { Policy, Training, Incident, Trend, AuditLog } = require(pathRequire('..', 'Model', 'GModels'));

// Helper to require with path join
function pathRequire(...parts) {
  const path = require('path');
  return path.join(__dirname, ...parts);
}

// Get policies
async function getPolicies(req, res) {
  try {
    const items = await Policy.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get training
async function getTraining(req, res) {
  try {
    const items = await Training.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get incidents
async function getIncidents(req, res) {
  try {
    const items = await Incident.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get trends
async function getTrends(req, res) {
  try {
    const items = await Trend.find().lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Build a simple custom report from POST body (filters) and return a summary
async function postCustomReport(req, res) {
  try {
    const { role, userType, dateRange } = req.body || {};
    const policies = await Policy.find().lean();
    const trainings = await Training.find().lean();
    const incidents = await Incident.find().lean();

    const totalPolicy = policies.reduce((s, p) => s + (p.value || 0), 0);
    const totalTraining = trainings.reduce((s, t) => s + (t.value || 0), 0);
    const totalIncidents = incidents.reduce((s, i) => s + (i.value || 0), 0);

    const report = [
      { Field: 'Role', Value: role || 'All' },
      { Field: 'User Type', Value: userType || 'All' },
      { Field: 'Date Range', Value: dateRange || 'All' },
      { Field: 'Policy Acknowledged', Value: totalPolicy },
      { Field: 'Training Completed', Value: totalTraining },
      { Field: 'Total Incidents', Value: totalIncidents },
    ];

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Seed sample data
async function seedData(req, res) {
  try {
    await Policy.deleteMany({});
    await Training.deleteMany({});
    await Incident.deleteMany({});
    await Trend.deleteMany({});

    await Policy.insertMany([
      { name: 'Acknowledged', value: 1340 },
      { name: 'Pending', value: 160 },
    ]);

    await Training.insertMany([
      { name: 'Completed', value: 1168 },
      { name: 'Not Completed', value: 332 },
    ]);

    await Incident.insertMany([
      { name: 'High', value: 30 },
      { name: 'Medium', value: 50 },
      { name: 'Low', value: 90 },
    ]);

    await Trend.insertMany([
      { month: 'July', compliance: 40 },
      { month: 'Sept', compliance: 58 },
      { month: 'Oct', compliance: 62 },
      { month: 'Nov', compliance: 70 },
      { month: 'Dec', compliance: 82 },
    ]);

    res.json({ seeded: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// List audit logs with paging, filters, and search
async function getAuditLogs(req, res) {
  try {
    const { page = 1, limit = 25, actor, action, q, start, end } = req.query;
    const filter = {};
    if (actor) filter.actor = actor;
    if (action) filter.action = action;
    if (start || end) filter.timestamp = {};
    if (start) filter.timestamp.$gte = new Date(start);
    if (end) filter.timestamp.$lte = new Date(end);
    if (q) {
      // simple text search across actor, action, target, details
      filter.$or = [
        { actor: new RegExp(q, 'i') },
        { action: new RegExp(q, 'i') },
        { target: new RegExp(q, 'i') },
        { details: new RegExp(q, 'i') },
      ];
    }

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.max(1, parseInt(limit, 10));
    const [items, total] = await Promise.all([
      AuditLog.find(filter).sort({ timestamp: -1 }).skip(skip).limit(parseInt(limit, 10)).lean(),
      AuditLog.countDocuments(filter),
    ]);

    res.json({ page: parseInt(page, 10), limit: parseInt(limit, 10), total, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Seed sample audit logs (dev only)
async function seedAuditLogs(req, res) {
  try {
    await AuditLog.deleteMany({});
    const now = new Date();
    const sample = [
      { timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), actor: 'admin.user', action: 'Updated Policy', target: 'Acceptable Use v2', details: 'Changed version to 2.0' },
      { timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48), actor: 'j.smith', action: 'Downloaded Report', target: 'Custom Report', details: 'CSV export, 120 rows' },
      { timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 72), actor: 'system', action: 'Integration Failure', target: 'LDAP Sync', details: 'Timeout connecting to ldap.example.local' },
    ];
    await AuditLog.insertMany(sample);
    res.json({ seeded: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Return distinct actors for dropdowns
async function getDistinctActors(req, res) {
  try {
    // Return top actors by frequency (most active first)
    const agg = await AuditLog.aggregate([
      { $group: { _id: '$actor', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 200 },
    ]);
    const actors = agg.map(a => a._id).filter(Boolean);
    res.json(actors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Return distinct actions for dropdowns
async function getDistinctActions(req, res) {
  try {
    // Return top actions by frequency
    const agg = await AuditLog.aggregate([
      { $group: { _id: '$action', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 200 },
    ]);
    const actions = agg.map(a => a._id).filter(Boolean);
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getPolicies, getTraining, getIncidents, getTrends, postCustomReport, seedData, getAuditLogs, seedAuditLogs, getDistinctActors, getDistinctActions };
