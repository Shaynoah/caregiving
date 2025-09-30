const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://caregiving-1.onrender.com',
    'https://caregiving-api.onrender.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

// Environment configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority';

// Log startup configuration (without sensitive data)
console.log(`Server starting in ${NODE_ENV} mode on port ${PORT}`);

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: 'contact' },
    createdAt: { type: Date, default: Date.now }
});

// MongoDB connection handling
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
    try {
        console.log('Received contact request from origin:', req.headers.origin);
        console.log('Request headers:', req.headers);
        console.log('Request body:', req.body);
        
        const contact = new Contact(req.body);
        console.log('Created contact object:', contact);
        
        const saved = await contact.save();
        console.log('Successfully saved contact:', saved);
        
        res.status(200).json({
            success: true,
            message: 'Message sent successfully!',
            contact: saved
        });
    } catch (error) {
        console.error('Error in /api/contact:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({
            success: false,
            message: 'Error saving message: ' + error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        mongodbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    };
    try {
        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.message = error;
        res.status(503).json(healthcheck);
    }
});

app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort('-createdAt');
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching contacts' });
    }
});

async function startServer() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB error:', err);
        process.exit(1);
    }
}

startServer();
