import { initDB, loadSampleData } from "./src/config/db.js";
import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3001;

async function start() {
  await initDB(); // Create DB
  await loadSampleData("src/config/sampleData.json"); // Seed DB
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

start();
