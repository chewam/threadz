exports.user = require('./user');

exports.threads = require('./threads');

exports.checkSession = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send('session doesn\'t exist', {'Content-Type': 'text/plain'}, 403);
    }
};
