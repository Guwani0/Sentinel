// controllers/policyController.js
const express = require("express");
const router = express.Router();

// In-memory storage (replace later with DB)
let policies = [];

// Get all policies
router.get("/", (req, res) => {
  res.json(policies);
});

// Upload new policy
router.post("/", (req, res) => {
  const { title, description, fileName, notes, createdBy } = req.body;
  const newPolicy = {
    id: Date.now(),
    title,
    description,
    version: "1.0",
    status: "Published",
    createdBy,
    createdAt: Date.now(),
    fileName,
    assignments: [],
    acknowledgments: [],
    history: [
      {
        version: "1.0",
        changedBy: createdBy,
        changedAt: Date.now(),
        notes: notes || "Initial publish",
        fileName,
      },
    ],
  };
  policies.unshift(newPolicy);
  res.status(201).json(newPolicy);
});

// Upload new version
router.post("/:id/version", (req, res) => {
  const { id } = req.params;
  const { fileName, notes, changedBy } = req.body;
  const policy = policies.find((p) => p.id == id);
  if (!policy) return res.status(404).json({ error: "Policy not found" });

  const [maj, min] = policy.version.split(".").map(Number);
  const newVersion = `${maj}.${(min || 0) + 1}`;
  const newHistoryEntry = {
    version: newVersion,
    changedBy,
    changedAt: Date.now(),
    notes: notes || "Version update",
    fileName,
  };
  policy.version = newVersion;
  policy.fileName = fileName;
  policy.status = "Published";
  policy.createdAt = Date.now();
  policy.history.push(newHistoryEntry);

  res.json(policy);
});

// Assign to role/department
router.post("/:id/assign", (req, res) => {
  const { id } = req.params;
  const { type, value } = req.body;
  const policy = policies.find((p) => p.id == id);
  if (!policy) return res.status(404).json({ error: "Policy not found" });

  const already = policy.assignments.find((a) => a.type === type && a.value === value);
  if (!already) policy.assignments.push({ type, value });

  res.json(policy);
});

// Acknowledge
router.post("/:id/ack", (req, res) => {
  const { id } = req.params;
  const { userId, name } = req.body;
  const policy = policies.find((p) => p.id == id);
  if (!policy) return res.status(404).json({ error: "Policy not found" });

  const already = policy.acknowledgments.find((a) => a.userId === userId);
  if (!already) policy.acknowledgments.push({ userId, name, ts: Date.now() });

  res.json(policy);
});

// Toggle status
router.post("/:id/toggle", (req, res) => {
  const { id } = req.params;
  const policy = policies.find((p) => p.id == id);
  if (!policy) return res.status(404).json({ error: "Policy not found" });

  policy.status = policy.status === "Published" ? "Draft" : "Published";
  res.json(policy);
});

module.exports = router;
