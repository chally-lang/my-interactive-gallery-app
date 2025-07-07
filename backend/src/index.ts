import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10) || 5000;

app.get("/", (req, res) => {
  res.send("🎉 Interactive Gallery API is live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
