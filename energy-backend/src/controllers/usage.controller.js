import MeterState from "../models/MeterState.js";
import DayStartReading from "../models/DayStartReading.js";
import { updateMeterByTime } from "../utils/meterIncrement.js";

export const getTodayUsage = async (req, res) => {
  const { deviceId } = req.query;
  const today = new Date().toISOString().slice(0, 10);

  // 1️⃣ Get meter & advance it by time
  let meter = await MeterState.findOne({ deviceId });
  meter = updateMeterByTime(meter);
  await meter.save();

  // 2️⃣ Get or create today's start reading
  let start = await DayStartReading.findOne({ deviceId, date: today });

  if (!start) {
    start = await DayStartReading.create({
      deviceId,
      date: today,
      startReading: meter.meterReading // ✅ CORRECT
    });
  }

  // 3️⃣ Calculate today usage
  const todayUsage = Number(
    Math.max(0, meter.meterReading - start.startReading).toFixed(2)
  );

  res.json({ todayUsage });
};
