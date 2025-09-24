const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://carebridge_user:care2025@cluster0.hbuq5.mongodb.net/carebridge?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4527;

console.log('📡 Attempting to connect to MongoDB...');

// Connect to MongoDB
async function startServer() {
    try {
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB successfully');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`👉 Test API at http://localhost:${PORT}/api/articles`);
        });
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
}

startServer();

// Import routes
const articleRoutes = require('./routes/articleRoutes');

// Create Contact Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: 'contact' },
    createdAt: { type: Date, default: Date.now }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Serve static files with security options
app.use(express.static('../', {
    dotfiles: 'ignore',
    etag: true,
    maxAge: '1d',
    index: false,
    redirect: false
}));

// Routes
app.use('/api/articles', articleRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📩 Received contact form request');
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        
        if (!req.body) {
            throw new Error('Request body is empty');
        }
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Check if this is a duplicate submission (within last 5 seconds)
        const recentSubmission = await Contact.findOne({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            createdAt: { $gt: new Date(Date.now() - 5000) }
        });

        if (recentSubmission) {
            console.log('⚠️ Duplicate submission detected');
            return res.status(200).json({ 
                success: true,
                message: 'Thank you! Your message has been sent successfully.',
                contact: recentSubmission
            });
        }

        // Create and save contact
        const contact = new Contact(req.body);
        const savedContact = await contact.save();
        
        console.log('✅ Contact saved successfully:', savedContact);
        res.status(200).json({ 
            success: true,
            message: 'Thank you! Your message has been sent successfully.',
            contact: savedContact
        });
    } catch (error) {
        console.error('❌ Error saving contact:', error);
        console.error('Error details:', error.stack);
        
        // MongoDB validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Please check your input and try again.',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        // General error
        res.status(500).json({ 
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// List all contacts route (for testing)
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort('-createdAt');
        console.log('� Retrieved contacts:', contacts.length);
        res.json(contacts);
    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: err.message
    });
});

// No content - removing redundant code
