const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        theme: { type: String, default: 'light' },
        notifications: { type: String, default: 'enabled' },
        language: { type: String, default: 'English' }
    }
});

module.exports = mongoose.model('User', UserSchema);