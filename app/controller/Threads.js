Ext.define('Tz.controller.Threads', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Threads', 'ThreadForm'],
        refs: {
            navigation: 'tz_navigation'
        },
        control: {
            'tz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            'tz_threadform textfield': {
                action: 'onTextFieldAction'
            },
            'tz_threads button[action="users"]': {
                tap: 'onUsersButtonTap'
            },
            'tz_threads button[action="messages"]': {
                tap: 'onMessagesButtonTap'
            },
            'tz_threads button[action="delete"]': {
                tap: 'onDeleteButtonTap'
            }
        }
    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'tz_threads') {
            this.showForm();
        }
    },

    onUsersButtonTap: function(button) {
        var record = button.getRecord();

        this.getApplication().currentThread = record;
        this.showUsers(record);
    },

    onMessagesButtonTap: function(button) {
       var record = button.getRecord();

        this.getApplication().currentThread = record;
        this.showMessages(record);
    },

    showForm: function() {
        this.getNavigation().push({
            xtype: 'tz_threadform'
        });
    },

    showUsers: function(thread) {
        var store = thread.getUsers();

        this.getNavigation().push({
            store: store,
            xtype: 'tz_users'
        });

        store.sync();
    },

    showMessages: function(thread) {
        var store = thread.getMessages();

        this.getNavigation().push({
            store: store,
            xtype: 'tz_messages'
        });

        store.sync();
    },

    onTextFieldAction: function(field) {
        var user = this.getApplication().currentUser,
            data = {
                adminId: user.getId(),
                name: field.getValue(),
                timestamp: new Date().getTime()
            };

        this.addThread(data, function(thread) {
            this.addThreadAdmin(thread);
        }, this);

        this.getNavigation().pop();
    },

    onDeleteButtonTap: function(button) {
        var record = button.getRecord();

        this.removeThread(record, function() {});
    },

    removeThread: function(thread, callback, scope) {
        var store = Ext.getStore('threads'),
            user = this.getApplication().currentUser,
            isAdmin = user.getId() === thread.get('adminId');

        if (isAdmin) {
            thread.notifyUsers('remove');
            thread.removeUsers();
            thread.removeMessages();
        } else {
            thread.removeUser(user.getId());
            thread.notifyAdmin('quit');
        }

        store.remove(thread);

        store.sync(function(response) {
            console.warn('remove sync', response.r, response);
            if (response.r === 'ok') {
                callback.call(scope);
            }
        });
    },

    addThread: function(data, callback, scope) {
        var store = Ext.getStore('threads'),
            thread = Ext.create('Tz.model.Thread', data);

        store.add(thread);

        store.sync(function(response) {
            if (response.r === 'ok') {
                callback.call(scope, thread);
                store.load();
            }
        }, this);
    },

    addThreadAdmin: function(thread) {
        var users = thread.getUsers(),
            user = this.getApplication().currentUser;

        users.add({
            userId: user.getId(),
            email: user.getData().email,
            name: user.getData().username
        });

        users.sync();
    }

});
