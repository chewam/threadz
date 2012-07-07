var io = require('../../utils/io'),
    api = require('../../utils/api'),
    db = require('../../utils/database');

function Users() {}

Users.prototype.get = function(req, res) {
    api.getThreadUsers(req.params.id, function(result) {
        res.json(result);
    });
};

module.exports = new Users();
