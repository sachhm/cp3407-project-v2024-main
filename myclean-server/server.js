const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config');
const debug = require('debug')('myclean-server');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the "iteration1" directory
app.use(express.static(path.join(__dirname, '../iteration1')));

// Example route to get all users
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    debug(err);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    debug(err);
    res.status(500).json({ error: err.message });
  }
});

// Route to create a new booking
app.post('/api/bookings', async (req, res) => {
  const { user_id, service_id, booking_date, status } = req.body;

  // Log the request body
  debug('Request body:', req.body);

  // Validate request body
  if (!user_id || !service_id || !booking_date || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO bookings (user_id, service_id, booking_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, service_id, booking_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    debug(err);
    res.status(500).json({ error: err.message });
  }
});

// Redirect root URL to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../iteration1/index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});