require("dotenv").config();
const PORT = process.env.API_PORT || 3000;

const express = require("express");
const app = express();

// import tickets router
const ticketsRoutes = require('./routes/tickets');

// mount it
app.use('/tickets', ticketsRoutes);

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
