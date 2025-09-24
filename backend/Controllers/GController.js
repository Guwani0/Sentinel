const { Policy, Training, Incident, Trend } = require(pathRequire('..', 'Model', 'GModels'));

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

module.exports = { getPolicies, getTraining, getIncidents, getTrends, postCustomReport, seedData };
