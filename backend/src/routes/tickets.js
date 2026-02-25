const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

// GET all tickets
router.get("/tickets", async (req, res) => {
    try {
        const { requester_id, status } = req.query;

        let conditions = [];
        let values = [];
        let index = 1;

        if (requester_id) {
            if (isNaN(requester_id)) {
                return res.status(400).json({ error: "Invalid requester_id" });
            }

            conditions.push(`requester_id = $${index}`);
            values.push(Number(requester_id));
            index++;
        }

        if (status) {
            conditions.push(`status = $${index}`);
            values.push(status);
            index++;
        }

        let query = "SELECT * FROM tickets";

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        const result = await pool.query(query, values);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            return res.status(400).json({ error: "Invalid ticket ID" });
        }
        const result = await pool.query("SELECT * FROM tickets WHERE id = $1", [
            Number(id),
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
