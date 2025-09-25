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

const AuditLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  actor: String,
  action: String,
  target: String,
  details: String,
  meta: Object,
});

const Policy = mongoose.models.Policy || mongoose.model('Policy', PolicySchema);
const Training = mongoose.models.Training || mongoose.model('Training', TrainingSchema);
const Incident = mongoose.models.Incident || mongoose.model('Incident', IncidentSchema);
const Trend = mongoose.models.Trend || mongoose.model('Trend', TrendSchema);
const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

module.exports = { Policy, Training, Incident, Trend, AuditLog };
