var db = require('../../utils/database');

function User() {}

User.prototype.get = function(req, res) {
    var id = req.session.user.id,
        query = 'SELECT email FROM users WHERE id = ?';

    db.query(query, [id], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

User.prototype.login = function(req, res) {
    var user,
        data = req.body,
        query = 'SELECT id, email, password FROM users';

    if (data.login && data.password && data.login.length && data.password.length) {
        db.query(query, function(error, result) {
            if (error) throw error;
            for (var i = 0, l = result.length; i < l; i++) {
                user = result[i];
                if (user.email === data.login && user.password === data.password) {
                    delete user.password;
                    req.session.user = user;
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
                delete user.password;
                user.id = result.insertId;
                req.session.user = user;
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

User.prototype.token = function(req, res) {
    var user,
        token = req.body.token,
        id = req.session.user.id,
        query = 'UPDATE users SET token = ? WHERE id = ?';

    if (token && token.length) {
        db.query(query, [token, id], function(error, result) {
            if (error) throw error;
            console.log('token', token, result);
            res.json({
                success: true
            });
        });
    } else {
        res.json({
            success: false,
            error: 'wrong login or password'
        });
    }
};

module.exports = new User();
