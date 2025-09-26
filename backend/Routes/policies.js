const express = require("express");
const router = express.Router();
const Policy = require("../Model/Policy");
const multer = require("multer");
const path = require("path");

// File upload settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all policies
router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new policy
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, createdBy, notes } = req.body;
    const fileName = req.file.filename;

    const policy = new Policy({
      title,
      description,
      createdBy,
      fileName,
      history: [{ version: "1.0", changedBy: createdBy, changedAt: new Date(), notes: notes || "Initial upload", fileName }],
    });

    const savedPolicy = await policy.save();
    res.status(201).json(savedPolicy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST new version
router.post("/:id/version", upload.single("file"), async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    const [maj, min] = policy.version.split(".").map(Number);
    const newVersion = `${maj}.${(min || 0) + 1}`;
    const fileName = req.file.filename;
    const notes = req.body.notes || "Version update";

    policy.version = newVersion;
    policy.fileName = fileName;
    policy.history.push({ version: newVersion, changedBy: req.body.changedBy, changedAt: new Date(), notes, fileName });

    const updatedPolicy = await policy.save();
    res.json(updatedPolicy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH assign policy
router.patch("/:id/assign", async (req, res) => {
  try {
    const { type, value } = req.body;
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    if (!policy.assignments.find(a => a.type === type && a.value === value)) {
      policy.assignments.push({ type, value });
      await policy.save();
    }

    res.json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH acknowledge policy
router.patch("/:id/acknowledge", async (req, res) => {
  try {
    const { userId, name } = req.body;
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });

    if (!policy.acknowledgments.find(a => a.userId === userId)) {
      policy.acknowledgments.push({ userId, name, ts: new Date() });
      await policy.save();
    }

    res.json(policy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
