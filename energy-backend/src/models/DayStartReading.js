import mongoose from "mongoose";

const schema = new mongoose.Schema({
  deviceId: String,
  date: String,
  startReading: Number
});

export default mongoose.model("DayStartReading", schema);
