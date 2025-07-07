import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import likeRoutes from "./routes/likeRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

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

app.use("/api/auth", authRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// ✅ Add this route to respond to base URL "/"
app.get("/", (req, res) => {
  res.send("🎉 Interactive Gallery API is live!");
});

export default app;
