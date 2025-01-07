const User = require('../models/User');
const { validatePreferences } = require('../utils/validation');

const savePreferences = async (user, preferencesData, res) => {
    const { error } = validatePreferences(preferencesData);
    if (error) throw { status: 400, message: error.details[0].message };

    try {
        if (user) {
            // Authenticated user
            const userDoc = await User.findById(user._id);
            if (!userDoc) throw { status: 404, message: 'User not found.' };

            userDoc.preferences = preferencesData;
            await userDoc.save();

            // Update the cookie for authenticated users
            res.cookie('preferences', JSON.stringify(preferencesData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            return userDoc.preferences;
        } else {
            // Guest user
            res.cookie('preferences', JSON.stringify(preferencesData), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return preferencesData;
        }
    } catch (err) {
        throw err;
    }
};

const getPreferences = async (user, cookies) => {
    try {
        if (user) {
            // Authenticated user
            const userDoc = await User.findById(user._id);
            if (!userDoc) throw { status: 404, message: 'User not found.' };
            return userDoc.preferences;
        } else {
            // Guest user
            return cookies.preferences ? JSON.parse(cookies.preferences) : {};
        }
    } catch (err) {
        throw err;
    }
};

module.exports = { savePreferences, getPreferences };