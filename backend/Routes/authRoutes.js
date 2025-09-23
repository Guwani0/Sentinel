const express = require("express");
const { loginUser } = require("../Controllers/authController");

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
