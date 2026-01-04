import mongoose from "mongoose";

const dayWiseUsageSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  day: { type: Number, required: true },  // 1–31
  units: { type: Number, required: true }
});

const DayWiseUsage = mongoose.model(
  "DayWiseUsage",
  dayWiseUsageSchema
);

export default DayWiseUsage;
