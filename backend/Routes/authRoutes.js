const express = require("express");
const { loginUser, verifyOtp } = require("../Controllers/authController");

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

module.exports = router;
