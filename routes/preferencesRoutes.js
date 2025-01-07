const express = require('express');
const router = express.Router();
const preferencesService = require('../services/preferencesService');
const { isAuthenticated } = require('../middleware/auth');

// POST /preferences - Save user preferences
router.post('/', async (req, res) => {
    try {
        const preferences = await preferencesService.savePreferences(req.user, req.body, res);
        res.send(preferences);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

// GET /preferences - Retrieve saved preferences
router.get('/', async (req, res) => {
    try {
        const preferences = await preferencesService.getPreferences(req.user, req.cookies);
        res.send(preferences);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

module.exports = router;