const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  reporterName: { type: String },
  email: { type: String },
  phone: { type: String },
  organization: { type: String },
  dateTime: { type: Date, default: Date.now },
  incidentType: { type: String, required: true },
  description: { type: String, required: true },
  systemsAffected: [String],
  dataAffected: [String],
  severity: { type: String, default: "Medium" },
  actionsTaken: [String],
  anonymous: { type: Boolean, default: false },
  files: [String], // file paths or URLs
  status: { type: String, enum: ["Unsolved", "Solved"], default: "Unsolved" }
  
},{ timestamps: true });


module.exports = mongoose.model("Incident", incidentSchema);
