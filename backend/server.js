const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config')

const app = express();


// some important Middlewares
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(bodyParser.json());


// Registration route 
app.post('/api/register', (req, res) => {
  const { name, email, password, phone, landline, address, city } = req.body;
  const query = `
    INSERT INTO users (name, email, password, phone, address, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [name, email, password, phone, address, city], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create user' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});


// Fetch all registrations from database
app.get('/api/getusers', (req, res) => {
  const query = 'SELECT * FROM users';  // Query to fetch all records from the "registrations" table
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);  // Send the results as JSON
  });
});




// login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Fetch user from the database
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = result[0];

    // Compare the provided password with the plain text password in the database
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});




const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


