exports.user = require('./user');

exports.threads = require('./threads');

exports.checkSession = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({success: false, error: 'session doesn\'t exist'});
    }
};
