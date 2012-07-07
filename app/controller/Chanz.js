Ext.define('Cz.controller.Chanz', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Chanz', 'ChanzForm'],
        models: [],
        stores: [],
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
            // 'cz_chanz button[action="messages"]': {
            //     tap: 'onChanzMessagesButtonTap'
            // },
            'cz_chanz button[action="delete"]': {
                tap: 'onChanzDeleteButtonTap'
            }
        },
        before: {

        },
        routes: {

        }
    },

    init: function() {
        console.log('init chanz');
    },

    launch: function() {
        console.log('launch chanz');
    },

    onActivate: function(panel) {

    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'cz_chanz') {
            this.showChanzForm();
        }
    },

    onChanzUsersButtonTap: function(button) {
        var record = button.getRecord();
            // users = record.get('users');

        this.getApplication().currentChan = record;
        this.showChanUsers(record);
    },

    // onChanzMessagesButtonTap: function(button) {
    //     var record = button.getRecord(),
    //         messages = record.get('messages');

    //     Cz.app.currentChan = record;
    //     this.showChanMessages(messages);
    // },

    showChanzForm: function() {
        this.getNavigation().push({
            xtype: 'cz_chanzform'
        });
    },

    showChanUsers: function(chan) {
        // this.getNavigation().push({
        //     xtype: 'cz_chanusers'
        // }).getStore().setData(users);
        // var storeId = chan.getChanId() + '-users';
        // var store = this.getUsersStore(chan);
        var store = chan.getUsers();

        this.getNavigation().push({
            store: store,
            xtype: 'cz_chanusers'
        });

        store.sync();
    },

    // showChanMessages: function(messages) {
    //     this.getNavigation().push({
    //         xtype: 'cz_chanmessages'
    //     }).getStore().setData(messages);
    // },

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

    // TODO: find a way to update stores collection after sync.
    addChan: function(data, callback, scope) {
        var store = Ext.getStore('chanz'),
            chan = Ext.create('Cz.model.Chan', data);

        // chan = store.add({
        //     isAdmin: true,
        //     text: field.getValue(),
        //     timestamp: new Date().getTime()
        //     // users: [{
        //     //     isAdmin: true,
        //     //     userid: user.getId(),
        //     //     email: user.getData().email,
        //     //     username: user.getData().username
        //     // }]
        // })[0];

        store.add(chan);

        // chan = store.add(data)[0];
        // chan.commit();

        console.log('addChan', chan, chan.getId());

        // chan.set({
        //     chanId: chan.getId(),
        //     users: chan.getId() + '-users',
        //     messages: chan.getId() + '-messages'
        // });

        // store.sync(callback, scope);

        store.sync(function(response) {
            if (response.r === 'ok') {
                callback.call(scope, chan);
                store.load();
            }
        }, this);        

        // store.sync(Ext.bind(function(chan, response) {
        //     console.warn('add sync', response.r, response, chan, chan.getId());
        //     if (response.r === 'ok') {
        //         callback.call();
        //     }
        // }, scope || this, [chan], 0), this);

        // store.sync(function(response) {
        //     // chan.commit();
        //     console.warn('add sync', response.r, response, chan, chan.getId());
        //     if (response.r === 'ok') {
        //         callback.call();
        //     }

        //     // var storeId = chan.getId() + '-users';

        //     // Ext.create('Ext.data.Store', {
        //     //     autoLoad: true,
        //     //     autoSync: false,
        //     //     storeId: storeId,
        //     //     model: 'Cz.model.User',
        //     //     proxy: {
        //     //         id: storeId,
        //     //         owner: 'user',
        //     //         access: 'public',
        //     //         type: 'syncstorage'
        //     //     },
        //     //     data: [{
        //     //         isAdmin: true,
        //     //         userid: user.getId(),
        //     //         email: user.getData().email,
        //     //         username: user.getData().username
        //     //     }]
        //     // });

        //     // storeId = chan.getId() + '-messages';

        //     // Ext.create('Ext.data.Store', {
        //     //     autoLoad: true,
        //     //     autoSync: false,
        //     //     storeId: storeId,
        //     //     model: 'Cz.model.Message',
        //     //     proxy: {
        //     //         id: storeId,
        //     //         owner: 'user',
        //     //         access: 'public',
        //     //         type: 'syncstorage'
        //     //     }
        //     // });

        // }, this);
    },

    addChanAdmin: function(chan) {
        // var store = this.getUsersStore(chan),
        var users = chan.getUsers(),
            user = this.getApplication().currentUser;

        users.add({
            userId: user.getId(),
            email: user.getData().email,
            name: user.getData().username
        });
        users.sync();
    }

    // getUsersStore: function(chan) {
    //     var storeId = chan.getChanId() + '-users';

    //     return Ext.getStore({
    //         storeId: storeId,
    //         proxy: {id: storeId},
    //         model: 'Cz.model.User',
    //         xtype: 'cz_publicstore'
    //     });
    // },

    // broadcastRemove: function(chan) {
    //     var message = {
    //         type: 'unshare',
    //         data: {
    //             chanId: chan.getChanId()
    //         }
    //     };

    //     Ext.io.Channel.get({name: chan.getChanId()}, function(channel) {
    //         channel.publish({message: message.getData()}, function(error) {
    //             console.log('publish', arguments);
    //         });
    //     });
    //     // Ext.io.Channel.get({name: chan.getChanId()}, function(channel) {
    //     //     channel.on({
    //     //         scope: this,
    //     //         message: function(sender, message) {
    //     //             var chan = this.getById(message.chanId);

    //     //             console.log('recieve channel message', arguments, chan);
    //     //             if (chan) {
    //     //                 delete message.chanId;
    //     //                 Cz.app.fireEvent('message', message, chan);
    //     //             }
    //     //         }
    //     //     });
    //     // }, this);
    // }

});
