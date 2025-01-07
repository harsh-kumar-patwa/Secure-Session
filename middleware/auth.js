const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (user) {
                req.user = user;
                return next();
            } else {
                return res.status(401).send('Unauthorized: Invalid user session.');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).send('Internal server error.');
        }
    } else {
        req.user = null;
        return res.status(401).send('Unauthorized: No user session.');
    }
};

module.exports = { isAuthenticated };