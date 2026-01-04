import mongoose from "mongoose";

const dailyUsageSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  units: { type: Number, required: true }
});

export default mongoose.model("DailyUsage", dailyUsageSchema);
