Ext.define('Cz.controller.ChanUsers', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['ChanUsers'],
        models: [],
        stores: [],
        refs: {
            navigation: 'cz_navigation',
            chanUsers: 'cz_chanusers',
            userSearch: 'cz_usersearch'
        },
        control: {
            // chanUsers: {
            //     activate: 'onActivate'
            // },
            'cz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            userSearch: {
                itemtap: 'onUserSearchItemTap'
            }
        },
        before: {

        },
        routes: {

        }
    },

    init: function() {
        console.log('init chanusers');
    },

    launch: function() {
        console.log('launch chanusers');
    },

    onActivate: function(panel) {

    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'cz_chanusers') {
            this.showUserSearch();
        }
    },

    showUserSearch: function() {
        console.log('showUserSearch', this.getNavigation());
        this.getNavigation().push({
            xtype: 'cz_usersearch'
        });
    },

    onUserSearchItemTap: function(list, index, target, record) {
        var chan = this.getApplication().currentChan,
            data = {
            email: record.getData().email,
            userId: record.getData().userId,
            name: record.getData().name,
            timestamp: new Date().getTime()
        };

        chan.addUser(data);
        this.getNavigation().pop();
    }

    // addUser: function(data) {
    //     console.log('addUser', data);
    //     // var store = this.getChanUsers().getStore(),
    //     var chan = this.getApplication().currentChan;

    //     chan.addUser(data, function(user) {
    //         chan.notifyUser(data.userId, 'add');
    //     }, this);

    //     // store.add({
    //     //     email: data.email,
    //     //     userId: data.userId,
    //     //     name: data.name,
    //     //     timestamp: new Date().getTime()
    //     // });

    //     // store.sync(function(response) {
    //     //     if (response.r === 'ok') {
    //     //         var message = {
    //     //             type: 'share',
    //     //             data: {
    //     //                 chanId: chan.getId(),
    //     //                 text: chan.get('text'),
    //     //                 timestamp: chan.get('timestamp')
    //     //             }
    //     //         };

    //     //         Ext.io.User.get({id: data.userid}, function(user) {
    //     //             user.send({message: message}, function(error) {
    //     //                 console.log('send', arguments);
    //     //             });
    //     //         });
    //     //     }
    //     // }, this);
    // }

    // onUserSearchItemTap: function(list, index, target, record) {
    //     var users = [],
    //         chan = Cz.app.currentChan,
    //         store = this.getChanUsers().getStore();

    //     store.add(record);

    //     store.each(function(record) {
    //         users.push(record.getData());
    //     });

    //     console.log('onUserSearchItemTap', record, chan, users);

    //     chan.set('users', users);

    //     Ext.getStore('chanz').sync(function() {
    //         this.warnAddedUser(record);
    //     }, this);

    //     this.getNavigation().pop();
    // },

    // warnAddedUser: function(user) {
    //     var id = user.get('userid'),
    //         chan = Cz.app.currentChan;

    //     console.log('warnAddedUser', user, id, chan);

    //     Ext.io.User.get({id: id}, function(user) {
    //         console.log('got user', user);
    //         user.send({message: chan.getData()}, function(error) {
    //             console.log('send', arguments);
    //         });
    //     });
    // }

});
