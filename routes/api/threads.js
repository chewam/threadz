var db = require('../../utils/database');

function Threads() {
    this.messages = require('./messages');
}

Threads.prototype.get = function(req, res) {
    var query = [
        'SELECT',
        'threads.id, threads.name,',
        'userThreads.isGranted, userThreads.isAdmin',
        'FROM threads, userThreads',
        'WHERE threads.id = userThreads.threadId',
        'AND userThreads.userId = ?'
    ].join(' ');

    db.query(query, [req.session.user.id], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

Threads.prototype.search = function(req, res) {
    var q = req.query,
        search = q.name + '%',
        start = parseInt(q.start, 10),
        limit = parseInt(q.limit, 10),
        query = [
        'SELECT',
        'threads.id, threads.name,',
        'userThreads.isGranted, userThreads.isAdmin',
        'FROM threads, userThreads',
        'WHERE threads.id = userThreads.threadId',
        'AND threads.name LIKE ?',
        'LIMIT ?, ?'
    ].join(' ');

    db.query(query, [search, start, limit], function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

Threads.prototype.add = function(req, res) {
    var threadId, values,
        userId = req.session.user.id,
        query = 'INSERT INTO threads SET ?',
        data = {
            name: req.body.name,
            userId: userId,
            creationDate: new Date()
        };

    db.query(query, data, function(error, result) {
        if (error) throw error;
        data.id = threadId = result.insertId;
        data.isGranted = true;
        data.isAdmin = true;
        query = 'INSERT INTO userThreads SET ?';
        values = {
            userId: userId,
            threadId: threadId,
            isGranted: true,
            isAdmin: true,
            creationDate: new Date()
        };

        db.query(query, values, function(error, result) {
            if (error) throw error;
            res.json([data]);
        });
    });
};

module.exports = new Threads();
