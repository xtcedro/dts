import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db.js";
import appointmentRoutes from "./routes/appointments.js";
import chatRoutes from "./routes/chatRoutes.js";
import stripeRoutes from "./routes/stripe.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

console.log("✅ Loading environment variables...");
console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
console.log("🔐 Securing Express middleware...");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

console.log("✅ Middleware configured. Registering routes...");

app.use("/api/stripe", stripeRoutes);
console.log("➡️ Stripe routes loaded at /api/stripe");

app.use("/api/appointments", appointmentRoutes);
console.log("➡️ Appointment routes loaded at /api/appointments");

app.use("/api/chat", chatRoutes);
console.log("➡️ Chat routes loaded at /api/chat");

app.use("/api/admin", adminRoutes);
console.log("➡️ Admin routes loaded at /api/admin");

app.use("/api/dashboard", dashboardRoutes);
console.log("➡️ Dashboard routes loaded at /api/dashboard");

app.use("/api/settings", settingsRoutes);
console.log("➡️ Settings routes loaded at /api/settings");

app.listen(port, () => {
  console.log(`🚀 Server is live at: http://localhost:${port}`);
});
