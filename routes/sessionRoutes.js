// routes/sessionRoutes.js
const express = require('express');
const router = express.Router();
const sessionService = require('../services/sessionService');
const { isAuthenticated } = require('../middleware/auth');

// POST /session - Start a new session
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const sessionData = await sessionService.startSession(req.user);
        req.session.sessionId = sessionData.sessionId;
        res.status(201).json(sessionData);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

// GET /session - Fetch session details
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const sessionData = await sessionService.getSessionDetails(req.session.sessionId);
        res.json(sessionData);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

// POST /session/page - Log a page visit and user actions
router.post('/page', isAuthenticated, async (req, res) => {
    try {
        const { page, action } = req.body;
        const pageData = await sessionService.logPageVisit(req.session.sessionId, page, action, req.query.page);
        res.json(pageData);
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

// DELETE /session - End the current session
router.delete('/', isAuthenticated, async (req, res) => {
    try {
        await sessionService.endSession(req.session.sessionId);
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Could not end session.');
            } else {
                return res.status(200).send('Session ended.');
            }
        });
    } catch (err) {
        res.status(err.status || 500).send(err.message);
    }
});

module.exports = router;