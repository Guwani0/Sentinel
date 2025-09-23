const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Model/User");
require("dotenv").config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const users = [
      { username: "Silva-ADM-001", password: "SilvaADM@123", role: "admin", name: "Silva Admin", email: "jinuka.markperera@gmail.com" },
      { username: "PERERA-SECOPS-001", password: "PereraOfficer@123", role: "security", name: "Perera Officer", email: "perera@security.com" },
      { username: "Fernando-IT-001", password: "FernandoIT@123", role: "employee", name: "Fernando IT", email: "fernando@it.com" },
    ];

    for (let userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        username: userData.username,
        password: hashedPassword,
        role: userData.role,
        name: userData.name,
        email: userData.email,
      });
      await user.save();
      console.log(`User ${userData.username} created`);
    }

    console.log("Seeding completed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();
