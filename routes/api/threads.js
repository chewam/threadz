var db = require('../../utils/database');

function Threads() {}

Threads.prototype.list = function(req, res) {
    var query = 'SELECT * FROM threads';

    db.query(query, function(error, result) {
        if (error) throw error;
        res.json(result);
    });
};

module.exports = new Threads();
