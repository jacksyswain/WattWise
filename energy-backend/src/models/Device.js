import mongoose from "mongoose";
const deviceSchema = new mongoose.Schema({
  name: String,
  deviceId: { type: String, unique: true }
});
export default mongoose.model("Device", deviceSchema);