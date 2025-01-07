const express = require('express');
const router = express.Router();
const preferencesService = require('../services/preferencesService');
const { isAuthenticated } = require('../middleware/auth');

// POST /preferences - Save user preferences
router.post('/', isAuthenticated, async (req, res) => {
    try {
        // Save preferences using the updated service function
        const preferences = await preferencesService.savePreferences(req.user, req.body, res);
        res.send(preferences);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

// GET /preferences - Retrieve saved preferences
router.get('/', isAuthenticated, async (req, res) => {
    try {
        // Get preferences using the updated service function
        const preferences = await preferencesService.getPreferences(req.user, req.cookies);
        res.send(preferences);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

module.exports = router;