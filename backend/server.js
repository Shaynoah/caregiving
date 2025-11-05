const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../')); // Serve static files from parent directory

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'carebridge'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Contact form endpoint
app.post('/php/contact.php', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    // Insert into database
    const sql = 'INSERT INTO contacts (name, email, phone, service_type, message) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, phone, service, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving contact:', err);
            return res.status(500).json({
                success: false,
                message: 'Failed to save your message. Please try again.'
            });
        }

        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong! Please try again.'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Database: ${process.env.DB_NAME || 'carebridge'}`);
});
