var users,
    db = require('./database');

function createUsersData() {
    var users = [];

    for (var i = 1, l = 10; i <= l; i++) {
        users.push({
            password: 'demo',
            creationDate: new Date(),
            email: 'user' + i + '@threadz.com'
        });
    }
    return users;
}

function insertUsers(users) {
    for (var i = 0, l = users.length; i < l; i++) {
        insertUser(users[i]);
    }
}

function insertUser(user) {
    var threads,
        query = 'INSERT INTO users SET ?';

    db.query(query, user, function(error, result) {
        if (error) throw error;
        user.id = result.insertId;
        console.log('---> user ' + result.insertId + ' inserted.');
        threads = createThreadsData(user);
        insertThreads(threads);
    });
}

function createThreadsData(user) {
    var threads = [];

    for (var i = 1, l = 3; i <= l; i++) {
        threads.push({
            userId: user.id,
            creationDate: new Date(),
            name: 'Thread ' + i + ' of user ' + user.id
        });
    }
    return threads;
}

function insertThreads(threads) {
    for (var i = 0, l = threads.length; i < l; i++) {
        insertThread(threads[i]);
    }
}

function insertThread(thread) {
    var messages,
        query = 'INSERT INTO threads SET ?';

    db.query(query, thread, function(error, result) {
        if (error) throw error;
        thread.id = result.insertId;
        console.log('---> thread ' + result.insertId + ' inserted.');
        insertUserThreadRelation({
            userId: thread.userId,
            threadId: thread.id,
            isGranted: true,
            isAdmin: true,
            creationDate: new Date()
        });
    });
}

function insertUserThreadRelation(relation) {
    var query = 'INSERT INTO userThreads SET ?';

    db.query(query, relation, function(error, result) {
        if (error) throw error;
        relation.id = result.insertId;
        console.log('---> relation ' + result.insertId + ' inserted.');
    });
}

// 

db.query('DELETE FROM users', function() {
    db.query('DELETE FROM threads', function() {
        db.query('DELETE FROM userThreads', function() {
            users = createUsersData();
            insertUsers(users);
        });
    });
});
