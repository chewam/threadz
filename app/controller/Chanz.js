Ext.define('Cz.controller.Chanz', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Chanz', 'ChanzForm'],
        refs: {
            navigation: 'cz_navigation'
        },
        control: {
            'cz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            'cz_chanzform textfield': {
                action: 'onTextFieldAction'
            },
            'cz_chanz button[action="users"]': {
                tap: 'onChanzUsersButtonTap'
            },
            'cz_chanz button[action="messages"]': {
                tap: 'onChanzMessagesButtonTap'
            },
            'cz_chanz button[action="delete"]': {
                tap: 'onChanzDeleteButtonTap'
            }
        }
    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'cz_chanz') {
            this.showChanzForm();
        }
    },

    onChanzUsersButtonTap: function(button) {
        var record = button.getRecord();

        this.getApplication().currentChan = record;
        this.showChanUsers(record);
    },

    onChanzMessagesButtonTap: function(button) {
       var record = button.getRecord();

        this.getApplication().currentChan = record;
        this.showChanMessages(record);
    },

    showChanzForm: function() {
        this.getNavigation().push({
            xtype: 'cz_chanzform'
        });
    },

    showChanUsers: function(chan) {
        var store = chan.getUsers();

        this.getNavigation().push({
            store: store,
            xtype: 'cz_chanusers'
        });

        store.sync();
    },

    showChanMessages: function(chan) {
        var store = chan.getMessages();

        this.getNavigation().push({
            store: store,
            xtype: 'cz_chanmessages'
        });

        store.sync();
    },

    onTextFieldAction: function(field) {
        var user = this.getApplication().currentUser,
            data = {
                adminId: user.getId(),
                text: field.getValue(),
                timestamp: new Date().getTime()
            };

        this.addChan(data, function(chan) {
            this.addChanAdmin(chan);
            // chan.notifyUsers('join');
        }, this);
        this.getNavigation().pop();
    },

    onChanzDeleteButtonTap: function(button) {
        var record = button.getRecord();

        this.removeChan(record, function() {
            
        });
    },

    removeChan: function(chan, callback, scope) {
        var store = Ext.getStore('chanz'),
            user = this.getApplication().currentUser,
            isAdmin = user.getId() === chan.get('adminId');

        console.log('removeChan', chan, chan.getId(), isAdmin);

        if (isAdmin) {
            chan.notifyUsers('remove');
            chan.removeUsers();
            chan.removeMessages();
        } else {
            chan.removeUser(user.getId());
            chan.notifyAdmin('quit');
        }

        store.remove(chan);

        store.sync(function(response) {
            console.warn('remove sync', response.r, response);
            if (response.r === 'ok') {
                callback.call(scope);
            }
        });
    },

    addChan: function(data, callback, scope) {
        var store = Ext.getStore('chanz'),
            chan = Ext.create('Cz.model.Chan', data);

        store.add(chan);

        store.sync(function(response) {
            if (response.r === 'ok') {
                callback.call(scope, chan);
                store.load();
            }
        }, this);
    },

    addChanAdmin: function(chan) {
        var users = chan.getUsers(),
            user = this.getApplication().currentUser;

        users.add({
            userId: user.getId(),
            email: user.getData().email,
            name: user.getData().username
        });
        users.sync();
    }

});
