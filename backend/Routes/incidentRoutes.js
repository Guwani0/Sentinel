const express = require("express"); 
const router = express.Router();
const { createIncident, getIncidents } = require("../Controllers/incidentController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configure multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// POST: submit a new incident with file uploads
router.post("/", upload.array("files"), createIncident);

// GET: fetch all incidents
router.get("/", getIncidents);

module.exports = router;
