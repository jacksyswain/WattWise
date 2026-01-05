import express from "express";
import { getLivePower } from "../controllers/livePower.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getLivePower);

export default router;
