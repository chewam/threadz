function Io() {}

Io.prototype.init = function(app, store) {
    var io = require('socket.io'),
        connect = require('express/node_modules/connect');
    
    console.log('---> Socket connection created. Version:', io.version);
    
    this.sockets = {};

    this.parseCookie = connect.utils.parseCookie;

    this.store = store;
    this.io = io.listen(app);
    // this.io.set( 'origins', '*127.0.0.1*:*' );
    this.io.set('authorization', this.checkAuthorization.bind(this));
    this.io.sockets.on('connection', this.onConnect.bind(this));
    this.io.set('log level', 1);

};

Io.prototype.onConnect = function(socket) {
    this.sockets[socket.handshake.session.user.id] = socket;
};

Io.prototype.checkAuthorization = function(data, accept) {
    // console.log('checkAuthorization cookie:', data.headers.cookie);
    if (data.headers.cookie) {
        data.cookie = this.parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['threadz.sid'];
        this.getSession(data.sessionID, function(session) {
            if (session) {
                data.session = session;
                console.log('---> Bind socket:', data.sessionID);
                accept(null, true);
            } else {
                accept("Session doesn't exist: " + data.sessionID, false);
            }
        });
    } else {
       return accept('No cookie transmitted.', false);
    }
};

Io.prototype.getSession = function(id, callback) {
    // var sessions = this.store.sessions;
    // for (var key in sessions) {
    //     console.log('session', key, sessions[key]);
    // }
    // console.log('');
    this.store.get(id, function (err, session) {
        if (err || !session || !session.user) {
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
    console.log('EMIT', id, event, data);
    if (socket) {
        console.log('EMIT', event);
        socket.emit(event, data);
    }
};

module.exports = new Io();
