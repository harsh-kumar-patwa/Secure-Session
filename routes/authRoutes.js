const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

// POST /auth/register - User registration
router.post('/register', async (req, res) => {
    try {
        const { username, password, preferences } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required.');
        }

        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists.');
        }

        user = new User({
            username,
            password,
            preferences
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// POST /auth/login - User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required.');
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid credentials.');
        }

        const isMatch = (password === user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials.');
        }

        req.session.userId = user._id;

        res.status(200).json({ message: "Logged in successfully", userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET /auth/logout
router.get('/logout', isAuthenticated, async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(400).send('User is not logged in.');
        }

        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Could not log out.');
            } else {
                return res.status(200).send('Logged out successfully.');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during logout.');
    }
});

module.exports = router;