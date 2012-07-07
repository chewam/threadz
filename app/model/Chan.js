Ext.define("Cz.model.Chan", {

    extend: 'Ext.data.Model',

    requires: ['Cz.model.User'],

    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'chanId', type: 'string'},
            {name: 'adminId', type: 'string'},
            {name: 'timestamp', type: 'int'}
        ]
    },

    toUrl: function() {
        console.log('Chan toUrl', 'chan/' + this.getId());
        return 'chan/' + this.getId();
    },

    getChanId: function() {
        return this.get('chanId') || this.getId();
    },

    getUsers: function() {
        var storeId = this.getChanId() + '-users',
            store = Ext.getStore(storeId);

        console.log('getUsers', storeId);
        return store || Ext.getStore({
            storeId: storeId,
            proxy: {id: storeId},
            model: 'Cz.model.User',
            xtype: 'cz_publicstore'
        });
    },

    getMessages: function() {
        var storeId = this.getChanId() + '-messages',
            store = Ext.getStore(storeId);

        return store || Ext.getStore({
            storeId: storeId,
            proxy: {id: storeId},
            model: 'Cz.model.Message',
            xtype: 'cz_publicstore'
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
            chanId: this.getChanId()
        };

        Ext.io.Channel.get({name: this.getChanId()}, function(channel) {
            channel.publish({message: message}, callback || Ext.emptyFn, scope);
        });
    },

    notifyUser: function(userId, type, callback, scope) {
        console.warn('*** notifyUser', arguments);
        var message = {
            type: type,
            data: {
                text: this.get('text'),
                chanId: this.getChanId(),
                adminId: this.get('adminId'),
                timestamp: this.get('timestamp')
            }
        };

        Ext.io.User.get({id: userId}, function(user) {
            user.send({message: message}, callback || Ext.emptyFn, scope);
        });
    }

});
