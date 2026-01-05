import cron from "node-cron";
import MeterState from "../models/MeterState.js";
import DayStartReading from "../models/DayStartReading.js";
import DayWiseUsage from "../models/DayWiseUsage.js";

/**
 * Runs every day at 00:00
 * Captures day start meter reading
 */
export const startMidnightCron = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("🕛 Midnight cron started");

    const today = new Date().toISOString().slice(0, 10);
    const day = new Date().getDate();

    const meters = await MeterState.find();

    for (const meter of meters) {
      // 1️⃣ Save day start reading
      await DayStartReading.create({
        deviceId: meter.deviceId,
        date: today,
        startReading: meter.meterReading,
      });

      // 2️⃣ Initialize today's bar with 0 units
      await DayWiseUsage.findOneAndUpdate(
        { deviceId: meter.deviceId, date: today },
        { day, units: 0 },
        { upsert: true }
      );
    }

    console.log("✅ Day reset completed");
  });
};
