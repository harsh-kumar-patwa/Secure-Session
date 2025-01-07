const isAuthenticated = (req, res, next) => {

    if (req.session.userId) {
        
        next();
    } else {
        req.user = null; 
        next();
    }
};

module.exports = { isAuthenticated };