import express from "express";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
  removeDuplicates
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/monthly", getSummary);
router.post("/cleanup/duplicates", removeDuplicates);

export default router;
