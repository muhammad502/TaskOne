const mysql = require('mysql2');

// Create a connection
const db = mysql.createConnection({
  host: '127.0.0.1', // Change this to your MySQL host
  user: 'root',      // Your MySQL username
  password: 'mohd@1214', // Your MySQL password
  database: 'exampleDB' // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

module.exports = db;