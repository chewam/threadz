Ext.define('Tz.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        before: {
            showDefaultRoute: ['checkSession']
        },
        routes: {
            '': 'showDefaultRoute'
        }
    },

    init: function() {
        Ext.Ajax.on({
            scope: this,
            requestexception: this.onRequestException
        });
        Tz.utils.Io.on('disconnect', this.onDisconnect, this);
    },

    checkSession: function(action) {
        Tz.utils.User.checkSession(function(success) {
            if (success) action.resume();
        });
    },

    showDefaultRoute: function() {
        this.redirectTo('threads');
    },

    onRequestException: function(connection, response) {
        var message = response.responseText;

        if (!message.length) {
            message = 'unknown server error';
        }

        Tz.utils.User.logout(message, function() {
            this.redirectTo('authentication/login');
        }, this);
    },

    onDisconnect: function() {
        console.log('onDisconnect');
        Tz.utils.Io.disconnect();
        Tz.utils.User.logout('socket connection lost', function() {
            this.redirectTo('authentication/login');
        }, this);
    }

});
