Ext.define('Tz.controller.Threads', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Threads'],
        refs: {
            threadsPanel: 'tz_navigation tz_threads'
        },
        control: {
            threadsPanel: {
                itemtap: 'onThreadsPanelItemTap',
                activate: 'onThreadsPanelActivate'
            }
        },
        before: {

        },
        routes: {

        }
    },

    onThreadsPanelActivate: function(panel) {
        var store = panel.getStore();

        store.load();
    },

    onThreadsPanelItemTap: function(list, index, target, record) {
        var id = record.get('id'),
            route = 'threads/' + id;

        this.redirectTo(route);
    }

});
