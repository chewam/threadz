Ext.define('Tz.controller.Messenger', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Messenger'],
        refs: {
            messengerPanel: 'tz_navigation tz_messenger'
        },
        control: {
            // threadsPanel: {
            //     activate: 'onMessagesPanelActivate'
            // }
            'tz_navigation tz_messenger button[action="send"]': {
                tap: 'onSendButtonTap'
            }
        },
        before: {

        },
        routes: {

        }
    },

    send: function() {
        var messengerPanel = this.getMessengerPanel(),
            values = messengerPanel.getValues();

        console.log('send', values);
    },

    onSendButtonTap: function() {
        this.send();
    }

});
