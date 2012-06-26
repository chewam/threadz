Ext.define('Tz.controller.Messages', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Messages'],
        refs: {
            threadsPanel: 'tz_navigation tz_messages'
        },
        control: {
            threadsPanel: {
                activate: 'onMessagesPanelActivate'
            },
            'tz_navigation tz_messages button[action="messenger"]': {
                tap: 'onMessengerButtonTap'
            }
        },
        before: {

        },
        routes: {

        }
    },

    onMessengerButtonTap: function() {
        console.log('onMessengerButtonTap');
        this.redirectTo('threads/31/messenger');
    },

    onMessagesPanelActivate: function(panel) {
        // var store = panel.getStore();

        // store.load();
    }

});
