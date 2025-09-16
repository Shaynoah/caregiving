const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: '*', // In production, change this to your specific domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept']
}));
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
    console.error('💡 Tip: Check your connection string and make sure your IP is whitelisted in MongoDB Atlas');
});

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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('📬 New contact form submission received:');
    console.log(JSON.stringify(req.body, null, 2));
    
    try {
        const contact = new Contact(req.body);
        await contact.save();
        console.log('✅ Contact form saved successfully!');
        res.status(201).json({ message: 'Contact form submitted successfully!' });
    } catch (error) {
        console.error('❌ Error saving contact form:', error);
        res.status(500).json({ message: 'Error submitting contact form' });
    }
});

// Routes
app.use('/api/articles', articleRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

// Contact form route
app.post('/api/contact', async (req, res) => {
    try {
        console.log('📩 Received contact form data:', req.body);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('🚀 Server running on http://localhost:' + PORT);
    console.log('👉 Test the server at http://localhost:' + PORT + '/test');
});
