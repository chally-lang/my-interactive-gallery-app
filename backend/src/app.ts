import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import likeRoutes from "./routes/likeRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

// ✅ Allow both 5173 and 3000
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

export default app;
