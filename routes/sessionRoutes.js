const express = require('express');
const router = express.Router();
const sessionService = require('../services/sessionService');

// POST /session - Start a new session (basic implementation)
router.post('/', async (req, res) => {
    try {
        const sessionData = await sessionService.startSession();
        req.session.sessionId = sessionData.sessionId; // Store sessionId in the session
        res.status(201).json(sessionData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;