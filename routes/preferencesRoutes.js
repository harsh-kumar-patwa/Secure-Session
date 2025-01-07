const express = require('express');
const router = express.Router();
const preferencesService = require('../services/preferencesService');

// Placeholder for authentication middleware
const isAuthenticated = (req, res, next) => {
    next();
};

// POST /preferences - Save user preferences (basic)
router.post('/', isAuthenticated, async (req, res) => {
    try {
        // For now, we'll just save preferences in cookies for guests
        const preferences = await preferencesService.savePreferences(null, req.body, res);
        res.send(preferences);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET /preferences - Retrieve preferences (basic)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const preferences = await preferencesService.getPreferences(null, req.cookies);
        res.send(preferences);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;