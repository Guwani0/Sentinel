const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoutes");
const path = require("path"); //nethupul
const bodyParser = require("body-parser"); //nethupul

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
//nethupul
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const policyRoutes = require("./Routes/policies");
app.use("/api/policies", policyRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
})
.catch((err) => console.error("❌ DB Connection Error:", err));
