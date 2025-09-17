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
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

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

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Connect to MongoDB and start server
console.log('📡 Attempting to connect to MongoDB...');

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    
    // Start server after MongoDB connection is established
    app.listen(PORT, () => {
        console.log('🚀 Server running on http://localhost:' + PORT);
        console.log('👉 Test the server at http://localhost:' + PORT + '/test');
    });
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});
