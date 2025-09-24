const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 2. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 3. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // 4. Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
  from: process.env.GMAIL_USER,
  to: user.email,
  subject: "Sentinel One Time Password (OTP) Verification",
  html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: #3a0044; padding: 20px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px;">Sentinel One Time Password (OTP) Verification</h2>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #000000;">
        <p style="color:#000000; margin:0;" >Dear User,</p>
        <p style="color:#000000; margin:0;" >Your one-time password (OTP) for <strong>Sentinel</strong> is:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background: #3a0044; color: #ffffff; padding: 12px 24px; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 3px;">
            ${otp}
          </span>
        </div>

        <p style="color:#000000; margin:0;" >This code is valid for the next <strong>10 minutes</strong>. It can only be used once.</p>
        <p style="color:#000000; margin:0;" >If you did not request this code, please ignore this email and contact support immediately at 
          <a href="mailto:support@sentinel.lk">support@sentinel.lk</a>.
        </p>
        <br/>
        <p style="color:#000000; margin:0;" >Regards,<br/>Sentinel<br/>Sri Lanka Army</p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f5f9; text-align: center; padding: 10px; font-size: 12px; color: #6b7280;">
        © www.sentinel.lk
      </div>
    </div>
  </div>
  `
};


    // const mailOptions = {
    //   from: process.env.GMAIL_USER,
    //   to: user.email,
    //   subject: "Your OTP for Login",
    //   text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    // };

    await transporter.sendMail(mailOptions);

    // 5. Respond
    res.json({ message: "OTP sent to your email", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "superSecretKey",
      { expiresIn: "1h" }
    );

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

