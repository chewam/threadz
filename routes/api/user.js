var db = require('../../utils/database');

function User() {}

User.prototype.login = function(req, res) {
    var user,
        data = req.body,
        query = 'SELECT email, password FROM users';

    if (data.login && data.password && data.login.length && data.password.length) {
        db.query(query, function(error, result) {
            if (error) throw error;
            for (var i = 0, l = result.length; i < l; i++) {
                user = result[i];
                if (user.email === data.login && user.password === data.password) {
                    req.session.email = user.email;
                    res.json({success: true});
                    return;
                }
            }
            res.json({
                success: false,
                error: 'wrong login or password'
            });
        });
    } else {
        res.json({
            success: false,
            error: 'wrong login or password'
        });
    }
};

User.prototype.register = function(req, res) {
    var user,
        data = req.body,
        query = 'SELECT email FROM users';

    if (data.login && data.password && data.login.length && data.password.length) {
        db.query(query, function(error, result) {
            if (error) throw error;
            for (var i = 0, l = result.length; i < l; i++) {
                user = result[i];
                if (user.email === data.login) {
                    res.json({
                        success: false,
                        error: 'user already exists'
                    });
                    return;
                }
            }

            query = 'INSERT INTO users SET ?';
            user = {
                email: data.login,
                password: data.password,
                creationDate: new Date()
            };
            db.query(query, user, function(error, result) {
                if (error) throw error;
                res.json({
                    success: true
                });
            });
        });
    } else {
        res.json({
            success: false,
            error: 'login or password is missing'
        });
    }
};

User.prototype.logout = function(req, res) {
    delete req.session.user;
    res.json({success: true});
};

module.exports = new User();
