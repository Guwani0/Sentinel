const express = require('express');
const router = express.Router();
const path = require('path');

// Require controller
const controller = require(path.join(__dirname, '..', 'Controllers', 'GController'));

// Data endpoints
router.get('/policies', controller.getPolicies);
router.get('/training', controller.getTraining);
router.get('/incidents', controller.getIncidents);
router.get('/trends', controller.getTrends);

// Custom report builder
router.post('/custom-report', controller.postCustomReport);

// Seed sample data (dev only)
router.post('/seed', controller.seedData);

module.exports = router;
