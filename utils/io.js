function Io() {
    console.log('---> Create Io');
}

Io.prototype.init = function(app, store) {
    var io = require('socket.io'),
        connect = require('express/node_modules/connect');

    this.sockets = {};

    this.parseCookie = connect.utils.parseCookie;

    this.store = store;
    this.io = io.listen(app);
    this.io.set('authorization', this.checkAuthorization.bind(this));
    this.io.sockets.on('connection', this.onConnect.bind(this));
    this.io.set('log level', 1);

};

Io.prototype.onConnect = function(socket) {
    console.log('onConnect', socket.handshake.session.email);
    this.sockets[socket.handshake.session.email] = socket;
};

Io.prototype.checkAuthorization = function(data, accept) {
    console.log('checkAuthorization');
    if (data.headers.cookie) {
        data.cookie = this.parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['threadz.sid'];
        this.getSession(data.sessionID, function(session) {
            if (session) {
                data.session = session;
                accept(null, true);
            } else {
                accept("Session doesn't exist.", false);
            }
        });
    } else {
       return accept('No cookie transmitted.', false);
    }
};

Io.prototype.getSession = function(id, callback) {
    this.store.get(id, function (err, session) {
        if (err || !session || !session.email) {
            callback.call(this, false);
        } else {
            callback.call(this, session);
        }
    });
};

Io.prototype.getSocket = function(id) {
    return this.sockets[id] || false;
};

Io.prototype.emit = function(id, event, data) {
    var socket = this.getSocket(id);
    console.log('EMIT', id, event, socket);
    if (socket) {
        console.log('EMIT', event);
        socket.emit(event, data);
    }
};

module.exports = new Io();
