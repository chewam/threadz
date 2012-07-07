Ext.define('Cz.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Navigation'],
        models: ['Chan', 'User', 'Message'],
        stores: ['Chanz', 'UserSearch'],
        refs: {
            navigation: {
                autoCreate: true,
                xtype: 'cz_navigation',
                selector: 'viewport > cz_navigation'
            }
        }
    },

    init: function() {
        console.log('init main');
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
        Ext.getStore('chanz').sync();
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
        var store = Ext.getStore('chanz'),
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
        var store = Ext.getStore('chanz');

        store.add(data);

        store.sync(function(response) {
            console.warn('join sync', response.r);
            if (response.r === 'ok') {
                store.load();
            }
        });
    },

    onQuit: function(data) {
        var store = Ext.getStore('chanz'),
            chan = store.findRecord('id', data.chanId);

        if (chan) {
            chan.getUsers().sync();
        }
    }

});
