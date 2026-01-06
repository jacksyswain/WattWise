import express from "express";
import cors from "cors";

/* =====================
   ROUTE IMPORTS
===================== */
import authRoutes from "./routes/auth.routes.js";
import deviceRoutes from "./routes/device.routes.js";
import readingRoutes from "./routes/readings.routes.js";
import usageRoutes from "./routes/usage.routes.js";
import livePowerRoutes from "./routes/livePower.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import chartRoutes from "./routes/chart.routes.js";

/* =====================
   APP INIT
===================== */
const app = express();

/* =====================
   MIDDLEWARE
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",          // local frontend
      "https://your-frontend.vercel.app" // deployed frontend (replace)
    ],
    credentials: true,
  })
);

app.use(express.json());

/* =====================
   HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "⚡ WattWise API is running",
  });
});

/* =====================
   API ROUTES
===================== */
app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/live-power", livePowerRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/chart", chartRoutes);

/* =====================
   GLOBAL ERROR HANDLER
===================== */
app.use((err, req, res, next) => {
  console.error("❌ API Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

export default app;
