Ext.define('Cz.controller.ChanUsers', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['ChanUsers'],
        refs: {
            navigation: 'cz_navigation',
            chanUsers: 'cz_chanusers',
            userSearch: 'cz_usersearch'
        },
        control: {
            'cz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            userSearch: {
                itemtap: 'onUserSearchItemTap'
            }
        }
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

});
