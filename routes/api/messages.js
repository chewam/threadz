var io = require('../../utils/io'),
    db = require('../../utils/database');

function Messages() {}

Messages.prototype.get = function(req, res) {
    var query = [
        'SELECT',
        'messages.id, messages.text,',
        'messages.creationDate, users.email',
        'FROM messages, users',
        'WHERE threadId = ? AND messages.userId = users.id'
    ].join(' ');

    db.query(query, [req.params.id], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

Messages.prototype.add = function(req, res) {
    var userId = req.session.user.id,
        threadId = req.params.id,
        query = 'INSERT INTO messages SET ?',
        data = {
            text: req.body.text,
            userId: userId,
            threadId: threadId,
            creationDate: new Date()
        };

    db.query(query, data, function(error, result) {
        if (error) throw error;
        query = [
            'SELECT',
            'messages.id, messages.text, messages.threadId,',
            'messages.creationDate, users.email',
            'FROM messages, users',
            'WHERE messages.id = ? AND messages.userId = users.id'
        ].join(' ');
        db.query(query, [result.insertId], function(error, result) {
            if (error) throw error;
            res.json(result);
            query = [
                'SELECT userId FROM userThreads',
                'WHERE threadId = ? AND userId != ?'
            ].join(' ');
            db.query(query, [threadId, userId], function(error, users) {
                if (error) throw error;
                console.log('users: ', users);
                for (var i = 0, l = users.length; i < l; i++) {
                    io.emit(users[i].userId, 'message', result[0]);
                }
            });
        });
    });
};

module.exports = new Messages();
