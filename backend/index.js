require('dotenv').config();
const express = require('express');
const pool = require('./db');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const corsOptions = {
  origin: 'https://helpdesk-app-nu.vercel.app/',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/tickets', async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const newTicket = await pool.query(
      "INSERT INTO tickets (name, email, description) VALUES ($1, $2, $3) RETURNING *",
      [name, email, description]
    );
    res.status(201).json(newTicket.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/tickets', async (req, res) => {
  try {
    const allTickets = await pool.query("SELECT * FROM tickets");
    res.json(allTickets.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put('/tickets/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updateTicket = await pool.query(
      "UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (updateTicket.rows.length === 0) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(updateTicket.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});