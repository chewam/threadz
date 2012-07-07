Ext.define('Tz.controller.UserSearch', {

    extend: 'Ext.app.Controller',

    config: {
        group: null,
        timer: null,
        views: ['UserSearch'],
        refs: {
            userList: 'tz_usersearch'
        },
        control: {
            'tz_usersearch searchfield': {
                keyup: 'onSearchFieldKeyup'
            }
        }
    },

    search: function(query) {
        var group = this.getGroup(),
            store = this.getUserList().getStore(),
            params = {
                query: 'username:' + query + '*'
            };

        group.findUsers(params, function(users) {
            this.clearSearch();
            for (var i = 0, l = users.length; i < l; i++) {
                var data = users[i].getData();

                console.log('add user to search list', users[i], users[i].getId(), data, store.getRange());

                store.add({
                    id: users[i].getId(),
                    userId: users[i].getId(),
                    email: data.email,
                    name: data.username
                });
            }
        }, this);
    },

    clearSearch: function() {
        var store = this.getUserList().getStore();

        store.removeAll();
    },

    loadGroup: function(callback, scope) {
        Ext.io.Group.getCurrent(function(group) {
            this.setGroup(group);
            callback.call(scope || this);
        }, this);
    },

    onSearchFieldKeyup: function(field) {
        var timer = this.getTimer(),
            query = field.getValue();

        if (query && query.length > 1) {
            if (timer) {
                clearTimeout(timer);
                this.setTimer(null);
            }

            timer = Ext.defer(function() {
                if (!this.getGroup()) {
                    this.loadGroup(function() {
                        this.search(query);
                    }, this);
                } else {
                    this.search(query);
                }
            }, 800, this);

            this.setTimer(timer);
        } else {
            this.clearSearch();
        }
    }

});
