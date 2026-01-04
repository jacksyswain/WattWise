import mongoose from "mongoose";
const readingSchema = new mongoose.Schema({
  deviceId: String,
  voltage: Number,
  current: Number,
  power: Number,
  energy: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Reading", readingSchema);