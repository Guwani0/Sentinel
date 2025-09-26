
const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: String,
  fileName: String,
  version: { type: String, default: '1.0' },
  status: { type: String, default: 'Draft' },
  history: [
    {
      version: String,
      changedBy: String,
      changedAt: Date,
      notes: String,
      fileName: String,
    },
  ],
  assignments: [
    {
      type: String,
      value: String,
    },
  ],
  acknowledgments: [
    {
      userId: String,
      name: String,
      ts: Date,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);
