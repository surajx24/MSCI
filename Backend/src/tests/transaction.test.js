import request from "supertest";
import app from "../../server.js";
import { initDB, loadSampleData } from "../config/db.js";

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await initDB();
  await loadSampleData("./sampleData.json");
});

describe("Transactions API", () => {
  test("GET /transactions returns list", async () => {
    const res = await request(app).get("/transactions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /transactions creates transaction", async () => {
    const newTx = { type: "income", category: "Bonus", amount: 1000, date: "2025-08-15", description: "Yearly bonus" };
    const res = await request(app).post("/transactions").send(newTx);
    expect(res.statusCode).toBe(201);
    expect(res.body.category).toBe("Bonus");
  });

  test("GET /transactions/summary/monthly returns summary", async () => {
    const res = await request(app).get("/transactions/summary/monthly");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalIncome");
    expect(res.body).toHaveProperty("totalExpense");
  });
});
