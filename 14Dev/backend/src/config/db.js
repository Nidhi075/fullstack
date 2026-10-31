// src/config/db.js
const mongoose = require("mongoose");
const dns = require("dns");

// Force DNS resolution through Cloudflare + Google
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://CoderArmy9:Hunter%409Bhai@leetcode.72ux7ls.mongodb.net/Mcoding",
    );
    console.log("✅ MongoDB connected successfully to Mcoding database");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = main;