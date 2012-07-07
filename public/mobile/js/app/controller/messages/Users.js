Ext.define('Tz.controller.messages.Users', {

    extend: 'Ext.app.Controller',

    config: {
        views: [
            'messages.Users'
        ],
        refs: {
            usersPanel: 'viewport > tz_messages_users',
            usersList: 'viewport > tz_messages_users list'
        },
        control: {
            usersPanel: {
                show: 'onUsersPanelActivate'
            }
        }
    },

    onUsersPanelActivate: function(panel) {
        console.log('onUsersPanelActivate', arguments);
        var list = this.getUsersList(),
            store = list.getStore();

        store.load();
    }

});
