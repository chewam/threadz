Ext.define('Tz.controller.Users', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Users'],
        refs: {
            users: 'tz_users',
            userSearch: 'tz_usersearch',
            navigation: 'tz_navigation'
        },
        control: {
            'tz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            userSearch: {
                itemtap: 'onUserSearchItemTap'
            }
        }
    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'tz_users') {
            this.showUserSearch();
        }
    },

    showUserSearch: function() {
        console.log('showUserSearch', this.getNavigation());
        this.getNavigation().push({
            xtype: 'tz_usersearch'
        });
    },

    onUserSearchItemTap: function(list, index, target, record) {
        var thread = this.getApplication().currentThread,
            data = {
                email: record.getData().email,
                userId: record.getData().userId,
                name: record.getData().name,
                timestamp: new Date().getTime()
            };

        thread.addUser(data);
        this.getNavigation().pop();
    }

});
