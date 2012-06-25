var mysql = require('mysql'),
    config = require('../config');

console.log("---> MySQL connection created.");

var connection = mysql.createConnection({
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

module.exports = connection;
