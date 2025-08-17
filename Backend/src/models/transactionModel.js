import { getDB } from "../config/db.js";

export async function getAll() {
  const db = getDB();
  return db.prepare("SELECT * FROM transactions").all();
}

// Create a new transaction
export async function create(data) {
  const db = getDB();
  const stmt = db.prepare(
    "INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)"
  );
  const result = stmt.run(data.type, data.category, data.amount, data.date, data.description);
  return { id: result.lastInsertRowid, ...data };
}

// Update an existing transaction
export async function update(id, data) {
  const db = getDB();
  const stmt = db.prepare(
    "UPDATE transactions SET type=?, category=?, amount=?, date=?, description=? WHERE id=?"
  );
  const result = stmt.run(data.type, data.category, data.amount, data.date, data.description, id);
  
  if (result.changes > 0) {
    // Return the updated transaction object
    return { id: parseInt(id), ...data };
  } else {
    throw new Error('Transaction not found or no changes made');
  }
}

// Delete a transaction
export async function remove(id) {
  const db = getDB();
  const stmt = db.prepare("DELETE FROM transactions WHERE id=?");
  return stmt.run(id);
}

// Remove duplicate transactions
export async function removeDuplicates() {
  const db = getDB();
  
  // Find and remove duplicates based on type, category, amount, date, and description
  const duplicates = db.prepare(`
    SELECT MIN(id) as keep_id, type, category, amount, date, description, COUNT(*) as count
    FROM transactions 
    GROUP BY type, category, amount, date, description 
    HAVING COUNT(*) > 1
  `).all();
  
  let removedCount = 0;
  for (const dup of duplicates) {
    const deleteStmt = db.prepare(`
      DELETE FROM transactions 
      WHERE type = ? AND category = ? AND amount = ? AND date = ? AND description = ? 
      AND id != ?
    `);
    const result = deleteStmt.run(dup.type, dup.category, dup.amount, dup.date, dup.description, dup.keep_id);
    removedCount += result.changes;
  }
  
  return removedCount;
}
