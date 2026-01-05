import MeterState from "../models/MeterState.js";
import DayStartReading from "../models/DayStartReading.js";
import DayWiseUsage from "../models/DayWiseUsage.js";
import { updateMeterByTime } from "../utils/meterIncrement.js";

/**
 * GET /api/usage/today
 * Returns today's energy usage in units (kWh)
 */
export const getTodayUsage = async (req, res) => {
  try {
    const { deviceId } = req.query;
    if (!deviceId) {
      return res.status(400).json({ message: "deviceId is required" });
    }

    const today = new Date().toISOString().slice(0, 10);
    const day = new Date().getDate();

    /* =========================
       1️⃣ Update Meter by Time
    ========================= */
    let meter = await MeterState.findOne({ deviceId });

    // Safety: create meter if missing
    if (!meter) {
      meter = await MeterState.create({ deviceId });
    }

    meter = updateMeterByTime(meter);
    await meter.save();

    /* =========================
       2️⃣ Get Day Start Reading
       (Created by Midnight Cron)
    ========================= */
    let start = await DayStartReading.findOne({ deviceId, date: today });

    // Fallback: if cron missed (server down)
    if (!start) {
      start = await DayStartReading.create({
        deviceId,
        date: today,
        startReading: meter.meterReading,
      });
    }

    /* =========================
       3️⃣ Calculate Today Usage
    ========================= */
    const todayUsage = Number(
      Math.max(0, meter.meterReading - start.startReading).toFixed(2)
    );

    /* =========================
       4️⃣ Sync Day-wise Chart Bar
    ========================= */
    await DayWiseUsage.findOneAndUpdate(
      { deviceId, date: today },
      {
        day,
        units: todayUsage,
      },
      { upsert: true }
    );

    /* =========================
       5️⃣ Send Response
    ========================= */
    res.json({ todayUsage });
  } catch (error) {
    console.error("❌ Today usage error:", error);
    res.status(500).json({ message: "Failed to fetch today usage" });
  }
};
