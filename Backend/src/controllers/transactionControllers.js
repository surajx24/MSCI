import * as service from "../services/transactionServices.js";

export async function getTransactions(req, res) {
  try {
    const transactions = await service.listTransactions();
    res.json(transactions); // array, not {}
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function addTransaction(req, res) {
  try {
    const newTx = await service.addTransaction(req.body);
    res.status(201).json(newTx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateTransaction(req, res) {
  try {
    const updatedTransaction = await service.editTransaction(req.params.id, req.body);
    res.json(updatedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteTransaction(req, res) {
  try {
    await service.deleteTransaction(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getSummary(req, res) {
  res.json(await service.getMonthlySummary());
}

export async function removeDuplicates(req, res) {
  try {
    const removedCount = await service.removeDuplicates();
    res.json({ message: `Removed ${removedCount} duplicate transactions`, removedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
