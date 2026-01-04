import express from "express";
import { getLivePower } from "../controllers/livePower.controller.js";

const router = express.Router();

router.get("/", getLivePower);

export default router;
