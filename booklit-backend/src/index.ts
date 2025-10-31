import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import experienceRoutes from "./routes/experienceRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import promoRoutes from "./routes/promoRoutes";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://booklit-neon.vercel.app/"], // ✅ Replace this
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/promo", promoRoutes);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0",() => console.log(`Server running on port ${PORT}`));
