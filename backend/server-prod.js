const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

console.log('📡 Attempting to connect to MongoDB...');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📦 Database:', mongoose.connection.db.databaseName);
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
});

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: 'contact' },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// API Routes
app.post('/api/contact', async (req, res) => {
    console.log('📬 New contact form submission received:', req.body);
    
    try {
        const contact = new Contact(req.body);
        await contact.save();
        console.log('✅ Contact form saved successfully!');
        res.status(201).json({ 
            success: true,
            message: 'Contact form submitted successfully!' 
        });
    } catch (error) {
        console.error('❌ Error saving contact form:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error submitting contact form',
            error: error.message
        });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        message: 'Server is running!',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Handle SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`👉 Test the API at http://localhost:${PORT}/api/health`);
});
