const Incident = require("../Model/Incident");


exports.createIncident = async (req, res) => {
  try {
    const files = req.files ? req.files.map(f => f.path) : [];

    const parseArray = field => {
      if (!req.body[field]) return [];
      return Array.isArray(req.body[field]) ? req.body[field] : [req.body[field]];
    };

exports.markIncidentSolved = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id); // find by incident ID
    if (!incident) {
      return res.status(404).json({ success: false, message: "Incident not found" });
    }

    incident.status = "Solved";             // mark as solved
    incident.lastEditedAt = new Date();     // track edit time
    await incident.save();

    res.json({ success: true, message: "Incident marked as Solved", incident });
  } catch (err) {
    console.error("Error marking incident as solved:", err);
    res.status(500).json({ error: err.message });
  }
};


    let incident;
    if (req.body.incidentId) {
      incident = await Incident.findById(req.body.incidentId);
      if (incident) {
        
        incident.dateTime = req.body.dateTime ? new Date(req.body.dateTime) : new Date();
        incident.reporterName = req.body.reporterName;
        incident.email = req.body.email;
        incident.phone = req.body.phone;
        incident.organization = req.body.organization;
        incident.dateTime = req.body.dateTime || new Date();
        incident.incidentType = req.body.incidentType;
        incident.description = req.body.description;
        incident.systemsAffected = parseArray("systemsAffected");
        incident.dataAffected = parseArray("dataAffected");
        incident.severity = req.body.severity || "Medium";
        incident.actionsTaken = parseArray("actionsTaken");
        incident.anonymous = req.body.anonymous === "true" || req.body.anonymous === true;
        incident.files = files.length > 0 ? files : incident.files;
        incident.lastEditedAt = new Date();
        await incident.save();
        return res.status(200).json({
          success: true,
          message: "Incident updated",
          incidentId: incident._id,
          incident
        });
      }
    }

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
      files,
      status: "Unsolved",
      lastEditedAt: null
    };

    incident = new Incident(incidentData);
    await incident.save();

    res.status(201).json({
      success: true,
      message: "Incident submitted",
      incidentId: incident._id,
      incident
    });
  } catch (err) {
    console.error("Error creating/updating incident:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    console.error("Error fetching incidents:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.markIncidentSolved = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, message: "Incident not found" });
    }

    incident.status = incident.status === "Solved" ? "Unsolved" : "Solved";
    incident.lastEditedAt = new Date();
    await incident.save();

    res.json({ success: true, message: "Incident marked as Solved", incident });
  } catch (err) {
    console.error("Error marking incident as solved:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
