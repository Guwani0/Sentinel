const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 2. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "superSecretKey",
      { expiresIn: "1h" }
    );

    // 4. Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

