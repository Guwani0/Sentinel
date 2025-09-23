const express = require("express");
const mongoose = require ("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(5000, () => console.log("Server running on port 5000"));
})
.catch((err) => console.log(err));