const express = require("express");
const pool = require("./db");
const { getStockPrice } = require("./stockService");

const router = express.Router();

// Add a stock to the portfolio
router.post("/portfolio", async (req, res) => {
    const { stock_symbol, quantity, price_at_purchase, purchase_date } =
        req.body;
    try {
        const result = await pool.query(
            "INSERT INTO portfolio_entries (stock_symbol, quantity, price_at_purchase, purchase_date) VALUES ($1, $2, $3, $4) RETURNING *",
            [stock_symbol, quantity, price_at_purchase, purchase_date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve all portfolio entries
router.get("/portfolio", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM portfolio_entries");
        const entries = await Promise.all(
            result.rows.map(async (entry) => {
                const current_price = await getStockPrice(entry.stock_symbol);
                return { ...entry, current_price };
            })
        );
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve a specific portfolio entry by ID
router.get("/portfolio/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM portfolio_entries WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Entry not found" });
        }
        const entry = result.rows[0];
        const current_price = await getStockPrice(entry.stock_symbol);
        res.status(200).json({ ...entry, current_price });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a portfolio entry by ID
router.put("/portfolio/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity, price_at_purchase } = req.body;
    try {
        const result = await pool.query(
            "UPDATE portfolio_entries SET quantity = $1, price_at_purchase = $2 WHERE id = $3 RETURNING *",
            [quantity, price_at_purchase, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Entry not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove a stock from the portfolio by ID
router.delete("/portfolio/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM portfolio_entries WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Entry not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
