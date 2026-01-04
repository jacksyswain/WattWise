import mongoose from "mongoose";

const monthStartSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  month: { type: String, required: true }, // YYYY-MM
  reading: { type: Number, required: true }
});

export default mongoose.model("MonthStartReading", monthStartSchema);
