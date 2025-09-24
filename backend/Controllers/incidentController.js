const Incident = require("../Model/Incident");

// Create new incident
exports.createIncident = async (req, res) => {
  try {
    // Extract file paths if any
    const files = req.files ? req.files.map(f => f.path) : [];

    // Helper: ensure array fields are always arrays
    const parseArray = field => {
      if (!req.body[field]) return [];
      return Array.isArray(req.body[field]) ? req.body[field] : [req.body[field]];
    };

    // Build incident data with proper arrays
    const incidentData = {
      reporterName: req.body.reporterName,
      email: req.body.email,
      phone: req.body.phone,
      organization: req.body.organization,
      dateTime: req.body.dateTime || new Date(),
      incidentType: req.body.incidentType,
      description: req.body.description,
      systemsAffected: parseArray("systemsAffected"),
      dataAffected: parseArray("dataAffected"),
      severity: req.body.severity || "Medium",
      actionsTaken: parseArray("actionsTaken"),
      anonymous: req.body.anonymous === "true" || req.body.anonymous === true,
      files
    };

    const incident = new Incident(incidentData);
    await incident.save();

    res.status(201).json({ 
      message: "Incident submitted", 
      incidentId: incident._id, 
      formData: incident 
    });
  } catch (err) {
    console.error("Error creating incident:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all incidents (optional, for admin)
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    console.error("Error fetching incidents:", err);
    res.status(500).json({ error: err.message });
  }
};
