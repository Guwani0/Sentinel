const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const TrainingSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const IncidentSchema = new mongoose.Schema({
  name: String,
  value: Number,
});

const TrendSchema = new mongoose.Schema({
  month: String,
  compliance: Number,
});

const Policy = mongoose.models.Policy || mongoose.model('Policy', PolicySchema);
const Training = mongoose.models.Training || mongoose.model('Training', TrainingSchema);
const Incident = mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);
const Trend = mongoose.models.Trend || mongoose.model('Trend', TrendSchema);

module.exports = { Policy, Training, Incident, Trend };
