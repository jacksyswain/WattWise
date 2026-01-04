import express from "express";
import { getTodayUsage } from "../controllers/usage.controller.js";

const router = express.Router();

router.get("/today", getTodayUsage);

export default router;
