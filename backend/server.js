const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env (simple loader)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  env.split(/\r?\n/).forEach(line => {
    const [k, v] = line.split('=');
    if (k && process.env[k] === undefined) process.env[k] = v || '';
  });
}

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5500',
    'https://caregiving-1.onrender.com',
    'https://caregiving-api.onrender.com'
  ],
  credentials: true
}));

// Validate env
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'carebridge';
const PORT = process.env.PORT || 5000;

if (!DB_NAME) {
  console.error('DB_NAME is not set. Please configure backend/.env');
  process.exit(1);
}

// MySQL connection
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  multipleStatements: false
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database successfully');
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Simple validation helper
function validateContact(body) {
  const errors = [];
  if (!body.name || body.name.trim() === '') errors.push('name is required');
  if (!body.email || body.email.trim() === '') errors.push('email is required');
  if (!body.phone || body.phone.trim() === '') errors.push('phone is required');
  if (!body.message || body.message.trim() === '') errors.push('message is required');
  return errors;
}

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, email, phone, service_type, message } = req.body;
  console.log('Contact payload:', { name, email, phone, service_type, message });

  const errors = validateContact(req.body);
  if (errors.length) return res.status(400).json({ success: false, errors });

  // Note: your DB column is named 'mesaage' (typo). Map frontend 'message' -> DB 'mesaage'
  // Insert only into existing columns: name, email, phone, service_type, mesaage
  const sql = 'INSERT INTO contacts (name, email, phone, service_type, mesaage) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, service_type || null, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact:', err);
      return res.status(500).json({ success: false, message: 'Error saving message: ' + err.message });
    }
    res.status(200).json({ success: true, message: 'Message sent successfully!', contactId: result.insertId });
  });
});

// GET /api/contacts?limit=10
app.get('/api/contacts', (req, res) => {
  const limit = parseInt(req.query.limit || '10', 10);
  // Return the mesaage column (matches your DB schema). Do not order by id (column may not exist).
  db.query('SELECT name, email, phone, service_type, mesaage AS message FROM contacts LIMIT ?', [limit], (err, results) => {
    if (err) {
      console.error('Error fetching contacts:', err);
      return res.status(500).json({ error: 'Error fetching contacts' });
    }
    res.json(results);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mysql: db.state });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});