import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

let db;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initDB() {
  const dbFile =
    process.env.NODE_ENV === "test"
      ? ":memory:"
      : process.env.DB_FILE || path.resolve(__dirname, "../../data.db");

  console.log(`Using database file: ${dbFile}`);

  try {
    db = new Database(dbFile);
    
    // Create table if it doesn't exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        description TEXT
      )
    `);
    
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function loadSampleData(filePath) {
  if (!db) throw new Error("DB not initialized — call initDB() first");

  // Check if data already exists
  const existingCount = db.prepare("SELECT COUNT(*) as count FROM transactions").get();
  if (existingCount.count > 0) {
    console.log(`Database already contains ${existingCount.count} transactions, skipping sample data load`);
    return;
  }

  const resolvedPath = path.resolve(__dirname, "../../", filePath);
  console.log(` Loading sample data from: ${resolvedPath}`);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Sample data file not found`);
    return;
  }

  const sampleData = JSON.parse(fs.readFileSync(resolvedPath, "utf-8"));

  // Use a transaction for better performance
  const insert = db.prepare(
    "INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)"
  );
  
  const insertMany = db.transaction((transactions) => {
    for (const t of transactions) {
      insert.run(t.type, t.category, t.amount, t.date, t.description);
    }
  });

  insertMany(sampleData);
  console.log(` Inserted ${sampleData.length} sample transactions`);
}

export function getDB() {
  if (!db) throw new Error("Database not initialized");
  console.log(" getDB returning active connection");
  return db;
}

