import express from "express";
import {
  getMonthlyDayWiseUsage
} from "../controllers/chart.controller.js";

const router = express.Router();

router.get("/monthly", getMonthlyDayWiseUsage);

export default router;
