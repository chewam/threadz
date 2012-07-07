/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    io = require('./utils/io');

var sessionStore = new express.session.MemoryStore();

var app = module.exports = express.createServer();

io.init(app, sessionStore);

// Configuration

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'threadz', store: sessionStore, key: 'threadz.sid'}));
    app.use(routes.allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Routes

// API user
app.post('/api/user/login', routes.api.user.login);
app.post('/api/user/register', routes.api.user.register);
app.post('/api/user/token', routes.api.user.token);
app.get('/api/user/logout', routes.api.checkSession, routes.api.user.logout);
app.get('/api/user', routes.api.checkSession, routes.api.user.get);

// API threads
app.get('/api/threads/:id/users', routes.api.checkSession, routes.api.threads.users.get);
app.get('/api/threads/:id/messages', routes.api.checkSession, routes.api.threads.messages.get);
app.post('/api/threads/:id/messages', routes.api.checkSession, routes.api.threads.messages.add);
app.get('/api/threads/search', routes.api.checkSession, routes.api.threads.search);
app.get('/api/threads', routes.api.checkSession, routes.api.threads.get);
app.post('/api/threads', routes.api.checkSession, routes.api.threads.add);

// MOBILE APP
app.get('/app', routes.app.index);

// WEB SITE
app.get('/', routes.site.index);

module.exports = app;
