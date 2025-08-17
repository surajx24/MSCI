import * as model from "../models/transactionModel.js";

export async function listTransactions() {
  return await model.getAll(); // ✅ already guaranteed to be an array
}

export async function addTransaction(data) {
  if (!data.type || !data.category || !data.amount || !data.date) {
    throw new Error("Missing required fields: type, category, amount, date");
  }
  return await model.create(data);
}

export async function editTransaction(id, data) {
  return await model.update(id, data);
}

export async function deleteTransaction(id) {
  return await model.remove(id);
}

export async function getMonthlySummary() {
  const rows = await model.getAll(); // ✅ safe array
  const totalIncome = rows
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = rows
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const categories = {};
  rows.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + t.amount;
  });

  return { totalIncome, totalExpense, balance, categories };
}

export async function removeDuplicates() {
  return await model.removeDuplicates();
}
