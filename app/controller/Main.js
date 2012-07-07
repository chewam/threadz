Ext.define('Cz.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Navigation'],
        models: ['Chan', 'User', 'Message'],
        stores: ['Chanz', 'UserSearch'/*, 'Users', 'Messages'*/],
        refs: {
            navigation: {
                autoCreate: true,
                xtype: 'cz_navigation',
                selector: 'viewport > cz_navigation'
            }
        },
        control: {
            
            
        },
        before: {

        },
        routes: {
            
        }
    },

    init: function() {
        console.log('init main');
        // Cz.app.on({
        //     scope: this,
        //     message: this.onMessage
        // });
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
        // user.on({
        //     message: function(sender, data) {
        //         console.warn('on IO message', this, arguments);
        //         Ext.getStore('chanz').add({
        //             text: data.text,
        //             users: data.users,
        //             messages: data.messages,
        //             timestamp: data.timestamp
        //         });
        //     }
        // });
        // this.getApplication().currentUser = user;
        // console.info('authorized', this, arguments);
        // this.showNavigation();
        // this.removeLogin();
        // sioController.updateButtonLogin();
        // Ext.getStore('chanz').sync(function(status) {
        //     console.log('SYNC =>', arguments);
        //     if (!status.created) {
        //         console.log('LOAD =>', status.created);
        //         Ext.getStore('chanz').load();
        //     }
        // });
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

    // onShare: function(data) {
    //     var store = Ext.getStore('chanz');

    //     store.add(data);
    //     store.sync();
    // }

    // onMessage: function(message, chan) {
    //     var messages,
    //         currentChan = Cz.app.currentChan,
    //         chanzStore = Ext.getStore('chanz'),
    //         messagesStore = Ext.getStore('messages');

    //     console.log('onMessage', arguments, chan, currentChan);

    //     chan = chan || currentChan;

    //     if (!chan) return false;

    //     messages = chan.get('messages');
    //     messages.push(message);
    //     chan.set('messages', messages);

    //     chanzStore.sync(function() {
    //         this.warnChanUsers(message, chan);
    //     }, this);

    //     if (currentChan === chan) {
    //         console.log('udpate current chan', currentChan);
    //         chanzStore.add(message);
    //     }
    // },

    // warnChanUsers: function(message, chan) {
    //     // var chan = Cz.app.currentChan;
    //         // messages = record.get('messages'),
    //         // message = messages[messages.length-1];
    //     // var user = Cz.app.currentUser;

    //     message.chanId = chan.getId();        

    //     console.log('dispatch message', message);
    //     Ext.io.Channel.get({name: chan.get('text')}, function(channel) {
    //         channel.publish({message: message}, function(error) {
    //             console.log('publish', arguments);
    //         });
    //     });
    // }

});
