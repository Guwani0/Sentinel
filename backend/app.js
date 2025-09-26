const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/authRoutes");
const path = require("path"); //nethupul
//const path = require('path'); //nomasha
const bodyParser = require("body-parser"); //nethupul
const incidentRoutes = require("./Routes/incidentRoutes");

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
app.use("/api/incidents", incidentRoutes);

//Nomasha -----
// Simple CORS middleware (allow all origins for dev)
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//         return res.status(200).json({});
//     }
//     next();
// });

// Mount API routes
//const apiRoutes = require(path.join(__dirname, 'Routes', 'GRoutes'));
//app.use('/api', apiRoutes);

// Root
//app.get('/', (req, res) => res.send('Backend API is running.'));
//-----------

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
