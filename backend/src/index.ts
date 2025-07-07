import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
