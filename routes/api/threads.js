var db = require('../../utils/database');

function Threads() {}

Threads.prototype.list = function(req, res) {
    var query = [
        'SELECT',
        'threads.id, threads.name,',
        'userThreads.isGranted, userThreads.isAdmin',
        'FROM threads, userThreads',
        'WHERE threads.id = userThreads.threadId',
        'AND threads.userId = ?'
    ].join(' ');

    db.query(query, [req.session.user.id], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

Threads.prototype.messages = function(req, res) {
    var query = [
        'SELECT',
        'id, text, userId',
        'FROM messages',
        'WHERE threadId = ?'
    ].join(' ');

    db.query(query, [req.params.id], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

module.exports = new Threads();
