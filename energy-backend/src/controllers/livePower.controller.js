import MeterState from "../models/MeterState.js";
import { updateMeterByTime } from "../utils/meterIncrement.js";

export const getLivePower = async (req, res) => {
  const { deviceId } = req.query;

  let meter = await MeterState.findOne({ deviceId });

  if (!meter) {
    meter = await MeterState.create({ deviceId });
  }

  meter = updateMeterByTime(meter);
  await meter.save();

  res.json({
    livePower: meter.meterReading
  });
};
