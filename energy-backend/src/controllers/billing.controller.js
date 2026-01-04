import MeterState from "../models/MeterState.js";
import MonthStartReading from "../models/MonthStartReading.js";
import { updateMeterByTime } from "../utils/meterIncrement.js";

const RATE = 8;

export const getMonthlyUsageAndBill = async (req, res) => {
  const { deviceId } = req.query;

  const now = new Date();
  const monthKey = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  let meter = await MeterState.findOne({ deviceId });
  meter = updateMeterByTime(meter);
  await meter.save();

  let start = await MonthStartReading.findOne({ deviceId, month: monthKey });

  if (!start) {
    start = await MonthStartReading.create({
      deviceId,
      month: monthKey,
      reading: meter.meterReading - 45 // ✅ realistic monthly seed
    });
  }

  const monthUsage = Number(
    (meter.meterReading - start.reading).toFixed(2)
  );

  const estimatedBill = Number((monthUsage * RATE).toFixed(2));

  res.json({
    monthUsage,
    estimatedBill
  });
};
