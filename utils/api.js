var db = require('./database');

function Api() {}

Api.prototype.getThreadUsers = function(id, callback, scope) {
    var query = [
        'SELECT users.id, users.email, userThreads.creationDate',
        'FROM users, userThreads, threads',
        'WHERE users.id = userThreads.userId',
        'AND userThreads.threadId = threads.id',
        'AND threads.id= ?'
    ].join(' ');

    db.query(query, [id], function(error, result) {
        if (error) throw error;
        callback.call(scope || this, result);
    });
};

module.exports = new Api();
