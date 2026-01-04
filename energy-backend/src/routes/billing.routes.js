import express from "express";
import { getMonthlyUsageAndBill } from "../controllers/billing.controller.js";

const router = express.Router();

router.get("/monthly", getMonthlyUsageAndBill);

export default router;
