Ext.define('Tz.controller.threads.Search', {

    extend: 'Ext.app.Controller',

    config: {
        views: [
            'threads.Search'
        ],
        refs: {
            list: 'tz_threads_search list'
        },
        control: {
            'tz_threads_search searchfield': {
                keyup: 'onSearchfieldKeyup'
            }
        }
    },

    search: function(name) {
        var store = this.getList().getStore();

        store.load({
            params: {
                name: name
            }
        });
    },

    clearList: function() {
        var store = this.getList().getStore();

        store.removeAll();
    },

    onSearchfieldKeyup: function(field) {
        var name = field.getValue();

        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (name.length) {
            this.timer = Ext.defer(this.search, 800, this, [name]);
        } else {
            this.clearList();
        }
    }

});
