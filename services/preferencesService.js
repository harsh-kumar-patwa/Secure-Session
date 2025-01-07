const { validatePreferences } = require('../utils/validation');

const savePreferences = async (user, preferencesData, res) => {
    // Basic validation for demonstration
    const { error } = validatePreferences(preferencesData);
    if (error) throw new Error(error.details[0].message);

    // For now, just saving to cookies
    res.cookie('preferences', JSON.stringify(preferencesData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict'
    });

    return preferencesData;
};

const getPreferences = async (user, cookies) => {
    // Getting preferences from cookies for now
    return cookies.preferences ? JSON.parse(cookies.preferences) : {};
};

module.exports = { savePreferences, getPreferences };