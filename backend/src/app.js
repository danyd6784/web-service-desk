require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.API_PORT || 3000;

app.use(express.json());

app.get("health", (req, res) => {
    res.json({status: "OK"});
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})
