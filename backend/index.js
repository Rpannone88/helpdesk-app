const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to create a new ticket
app.post('/tickets', (req, res) => {
  // Extract ticket data from request body
  const { name, email, description } = req.body;

  // TODO: Insert new ticket into database

  // Send response
  res.status(201).json({ message: 'Ticket created' });
});

// Route to update an existing ticket
app.put('/tickets/:id', (req, res) => {
  // Extract ticket ID from URL parameters
  const { id } = req.params;

  // Extract updated ticket data from request body
  const { status } = req.body;

  // TODO: Update ticket in database

  // Send response
  res.json({ message: 'Ticket updated' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
