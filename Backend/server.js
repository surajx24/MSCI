import express from "express";
import cors from "cors";
import transactionRoutes from "./src/routes/transactionRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);


export default app;