const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create new user/contact submission
router.post('/', async (req, res) => {
    try {
        console.log('Received form submission:', req.body);
        const user = new User(req.body);
        const savedUser = await user.save();
        console.log('Successfully saved to database:', savedUser);
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(400).json({ message: error.message });
    }
});

// Get all submissions (admin only)
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
