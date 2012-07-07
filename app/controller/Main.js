Ext.define('Tz.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Navigation'],
        models: ['Thread', 'User', 'Message'],
        stores: ['Threads', 'UserSearch'],
        refs: {
            navigation: {
                autoCreate: true,
                xtype: 'tz_navigation',
                selector: 'viewport > tz_navigation'
            }
        }
    },

    launch: function() {
        console.log('launch main');
        var sioController = this.getApplication().sio;

        sioController.on({
            scope: this,
            logout: this.onLogout,
            authorized: this.onAuth,
            usermessage: this.onUserMessage
        });
    },

    onAuth: function(user) {
        var sioController = this.getApplication().sio;

        console.log('onAuth', user);
        this.getApplication().currentUser = user;
        Ext.getStore('threads').sync();
        this.showNavigation();
        sioController.updateButtonLogin();
        this.removeLogin();
        return true;
    },

    onUserMessage: function(sender, message) {
        console.log("user got a message!", message, sender.getUserId());

        if (message.type && message.type.length) {
            this['on' + Ext.String.capitalize(message.type)](message.data);
        }
        return true;
    },

    onLogout: function() {
        var store = Ext.getStore('threads'),
            sioController = this.getApplication().sio;

        console.log('logout', this, arguments);
        store.getProxy().clear();
        store.load();
        sioController.showLogin();
        return true;
    },

    removeLogin: function() {
        var loginPanel = this.getApplication().sio.loginPanel;

        if (loginPanel) {
            loginPanel.destroy();
        }
    },

    showNavigation: function() {
        var navigation = this.getNavigation();

        Ext.Viewport.add(navigation);
    },

    onAdd: function(data) {
        var store = Ext.getStore('threads');

        store.add(data);

        store.sync(function(response) {
            console.warn('join sync', response.r);
            if (response.r === 'ok') {
                store.load();
            }
        });
    },

    onQuit: function(data) {
        var store = Ext.getStore('threads'),
            thread = store.findRecord('id', data.threadId);

        if (thread) {
            thread.getUsers().sync();
        }
    }

});
