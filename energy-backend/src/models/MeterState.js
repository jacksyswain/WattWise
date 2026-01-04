import mongoose from "mongoose";

const meterStateSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true },
  meterReading: { type: Number, default: 14981.7 }, // ✅ START VALUE
  lastUpdatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("MeterState", meterStateSchema);