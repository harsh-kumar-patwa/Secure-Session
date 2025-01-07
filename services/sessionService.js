const Session = require('../models/Session');

const startSession = async (user) => {
    try {
        const newSession = new Session({
            userId: user ? user._id : null,
            pagesVisited: [],
            startTime: new Date(),
            lastActivity: new Date(),
        });
        await newSession.save();
        return { sessionId: newSession._id, startTime: newSession.startTime };
    } catch (err) {
        throw err;
    }
};

const getSessionDetails = async (sessionId) => {
    if (!sessionId) throw { status: 400, message: 'Session not started.' };

    const session = await Session.findById(sessionId);
    if (!session) throw { status: 404, message: 'Session not found.' };

    // Check for session expiry (30 minutes)
    const inactivityDuration = (new Date() - session.lastActivity) / 1000 / 60;
    if (inactivityDuration > 30) {
        await session.deleteOne();
        throw { status: 440, message: 'Session expired.' };
    }

    // Update last activity time and duration
    session.lastActivity = new Date();
    session.sessionDuration = Math.round((session.lastActivity - session.startTime) / 1000 / 60);
    await session.save();

    return {
        pagesVisited: session.pagesVisited,
        actions: session.actions,
        startTime: session.startTime,
        duration: session.sessionDuration,
    };
};

const logPageVisit = async (sessionId, page, action, pageNum = 1) => {
    if (!sessionId) throw { status: 400, message: 'Session not started.' };

    const session = await Session.findById(sessionId);
    if (!session) throw { status: 404, message: 'Session not found.' };

    if (page) {
        session.pagesVisited.push(page);
    }
    if (action) {
        session.actions.push({ actionType: action, timestamp: new Date() });
    }

    // Update last activity time and duration
    session.lastActivity = new Date();
    session.sessionDuration = Math.round((session.lastActivity - session.startTime) / 1000 / 60);

    await session.save();

    // Pagination
    const limit = 10;
    const startIndex = (pageNum - 1) * limit;
    const endIndex = pageNum * limit;
    const paginatedPages = session.pagesVisited.slice(startIndex, endIndex);

    return { pagesVisited: paginatedPages, totalPages: Math.ceil(session.pagesVisited.length / limit) };
};

const endSession = async (sessionId) => {
    if (!sessionId) throw { status: 400, message: 'Session not started.' };

    const session = await Session.findById(sessionId);
    if (session) {
        await session.deleteOne();
    }
};

const getActiveSessions = async (userId) => {
    if (!userId) return null;
    return await Session.find({ userId });
};

// Add new function to cleanup expired sessions
const cleanupExpiredSessions = async () => {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    await Session.deleteMany({ lastActivity: { $lt: thirtyMinutesAgo } });
};

module.exports = { 
    startSession, 
    getSessionDetails, 
    logPageVisit, 
    endSession,
    getActiveSessions,
    cleanupExpiredSessions 
};