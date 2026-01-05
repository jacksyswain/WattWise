import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import deviceRoutes from "./routes/device.routes.js";
import readingRoutes from "./routes/readings.routes.js";
import usageRoutes from "./routes/usage.routes.js";
import livePowerRoutes from "./routes/livePower.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import chartRoutes from "./routes/chart.routes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/readings", readingRoutes);
app.use("/api/usage", usageRoutes); 
app.use("/api/live-power", livePowerRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/chart", chartRoutes);




export default app;