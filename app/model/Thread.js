Ext.define("Tz.model.Thread", {

    extend: 'Ext.data.Model',

    requires: ['Tz.model.User'],

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'threadId', type: 'string'},
            {name: 'adminId', type: 'string'},
            {name: 'timestamp', type: 'int'},
            {name: 'userCount', type: 'int', defaultValue: 0},
            {name: 'messageCount', type: 'int', defaultValue: 0},
            {name: 'unknownUserCount', type: 'int', defaultValue: 0},
            {name: 'unreadMessageCount', type: 'int', defaultValue: 0}
        ]
    },

    toUrl: function() {
        console.log('Thread toUrl', 'thread/' + this.getId());
        return 'thread/' + this.getThreadId();
    },

    getThreadId: function() {
        return this.get('threadId') || this.getId();
    },

    getUsers: function() {
        var storeId = this.getThreadId() + '-users',
            store = Ext.getStore(storeId);

        console.log('getUsers', storeId);
        return store || Ext.getStore({
            storeId: storeId,
            proxy: {id: storeId},
            model: 'Tz.model.User',
            xtype: 'tz_publicstore',
            listeners: {
                scope: this,
                load: function(store) {
                    this.updateUserCount(store.getCount());
                }
            }
        });
    },

    getMessages: function() {
        var storeId = this.getThreadId() + '-messages',
            store = Ext.getStore(storeId);

        return store || Ext.getStore({
            storeId: storeId,
            proxy: {id: storeId},
            model: 'Tz.model.Message',
            xtype: 'tz_publicstore',
            listeners: {
                scope: this,
                load: function(store) {
                    this.updateMessageCount(store.getCount());
                }
            }
        });
    },

    addUser: function(data, callback, scope) {
        var user,
            users = this.getUsers();

        callback = callback || Ext.emptyFn;

        user = users.add(data)[0];

        users.sync(function(response) {
            if (response.r === 'ok') {
                this.notifyUser(data.userId, 'add');
                callback.call(scope || this, user);
            }
        }, this);
    },

    removeUser: function(userId, callback, scope) {
        var user, users = this.getUsers();

        users.sync(function() {
            user = users.findRecord('userId', userId);

            console.log('removeUser', userId, user);
            if (user) {
                users.remove(user);
                users.sync(callback, scope);
            }
        });
    },

    removeUsers: function() {
        var users = this.getUsers();

        users.removeAll();
        // users.sync(function() {
        //     users.destroy();
        // });
    },

    addMessage: function(data, callback, scope) {
        var message,
            messages = this.getMessages();

        callback = callback || Ext.emptyFn;

        message = messages.add(data)[0];
        messages.sync(function(response) {
            if (response.r === 'ok') {
                this.notifyUsers('message');
                callback.call(scope || this, message);
            }
        }, this);
    },

    removeMessages: function() {
        var messages = this.getMessages();

        messages.removeAll();
        // messages.sync(function() {
        //     messages.destroy();
        // });
    },

    notifyAdmin: function(type, callback, scope) {
        console.warn('*** notifyAdmin', arguments);
        this.notifyUser(this.get('adminId'), type, callback, scope);
    },

    notifyUsers: function(type, callback, scope) {
        console.warn('*** notifyUsers', arguments);
        var message = {
            type: type,
            threadId: this.getThreadId()
        };

        Ext.io.Channel.get({name: this.getThreadId()}, function(channel) {
            channel.publish({message: message}, callback || Ext.emptyFn, scope);
        });
    },

    notifyUser: function(userId, type, callback, scope) {
        console.warn('*** notifyUser', arguments);
        var message = {
            type: type,
            data: {
                name: this.get('name'),
                threadId: this.getThreadId(),
                adminId: this.get('adminId'),
                timestamp: this.get('timestamp')
            }
        };

        Ext.io.User.get({id: userId}, function(user) {
            user.send({message: message}, callback || Ext.emptyFn, scope);
        });
    },

    updateUserCount: function(count) {
        if (count !== this.get('userCount')) {
            this.set('userCount', count);
            Ext.getStore('threads').sync();
        }
    },

    updateMessageCount: function(count) {
        if (count !== this.get('messageCount')) {
            this.set('messageCount', count);
            Ext.getStore('threads').sync();
        }
    }

});
