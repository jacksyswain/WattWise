import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startMidnightCron } from "./cron/midnightReset.js";

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 🔗 Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // 🕛 Start midnight cron job
    startMidnightCron();
    console.log("🕛 Midnight cron scheduled");

    // 🚀 Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
