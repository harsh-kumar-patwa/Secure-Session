require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const MongoDBStore = require('connect-mongodb-session')(session);
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();
connectDB();

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'appSessions',
});

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 30, 
    }
}));

app.use('/session', sessionRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

