import express from "express";
import Reading from "../models/Reading.js";
const router = express.Router();

router.post("/", async (req,res)=>{
  const {deviceId, voltage, current} = req.body;
  const power = voltage * current;
  const energy = power / 1000 / 3600;
  await Reading.create({deviceId, voltage, current, power, energy});
  res.json({success:true});
});

export default router;