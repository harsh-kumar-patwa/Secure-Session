require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionRoutes = require('./routes/sessionRoutes');
const cookieParser = require('cookie-parser');
const preferencesRoutes = require('./routes/preferencesRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'appSessions',
    expires: 1000 * 60 * 30, // 30 minutes
    autoRemove: 'interval',
    autoRemoveInterval: 1 // Runs cleanup every 1 minute
});

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 30, // 30 minutes
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/session', sessionRoutes);
app.use('/preferences', preferencesRoutes);

const { cleanupExpiredSessions } = require('./services/sessionService');
setInterval(cleanupExpiredSessions, 1000 * 60 * 5); // Run every 5 minutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

