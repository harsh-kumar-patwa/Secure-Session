const Session = require('../models/Session');

const startSession = async () => {
    const newSession = new Session({
        pagesVisited: [],
        startTime: new Date(),
        lastActivity: new Date(),
    });
    await newSession.save();
    return { sessionId: newSession._id, startTime: newSession.startTime };
};

module.exports = { startSession };