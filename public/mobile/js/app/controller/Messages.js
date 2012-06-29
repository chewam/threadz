Ext.define('Tz.controller.Messages', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Messages', 'Messenger'],
        refs: {
            navigationPanel: 'tz_navigation',
            messagesPanel: 'tz_navigation > tz_messages',
            messengerPanel: 'tz_navigation > tz_messenger'
        },
        control: {
            messagesPanel: {
                activate: 'onMessagesPanelActivate'
            },
            'tz_navigation > tz_messages button[action="messenger"]': {
                tap: 'onMessengerButtonTap'
            },
            'tz_navigation tz_messenger button[action="send"]': {
                tap: 'onSendButtonTap'
            },
            'tz_navigation button[action="menu"]': {
                tap: 'onMenuButtonTap'
            }
        }
    },

    init: function() {
        Tz.utils.Io.on('message', this.onMessage, this);
    },

    showMessenger: function() {
        var navigationPanel = this.getNavigationPanel();

        navigationPanel.push({
            xtype: 'tz_messenger'
        });
    },

    send: function() {
        var navigationPanel = this.getNavigationPanel(),
            messengerPanel = this.getMessengerPanel(),
            messagesPanel = this.getMessagesPanel(),
            values = messengerPanel.getValues(),
            store = messagesPanel.getStore();

        console.log('send', values);

        if (values.text.length) {
            values.creationDate = new Date();
            store.add(values);
            // store.sync();
            navigationPanel.pop();
        }
    },

    onSendButtonTap: function() {
        this.send();
    },

    onMessengerButtonTap: function() {
        console.log('onMessengerButtonTap');
        this.showMessenger();
    },

    onMessagesPanelActivate: function(panel) {
        // var store = panel.getStore();

        // store.load();
    },

    onMessage: function(message) {
        console.log('onMessage', this, arguments);
        var store,
            messagesPanel = this.getMessagesPanel();

        if (messagesPanel) {
            store = messagesPanel.getStore();
            store.add(message);
            // record = store.getById(message.threadId);
        }
    },

    onMenuButtonTap: function() {
        var messagesPanel = this.getMessagesPanel();

        if (messagesPanel && !messagesPanel.isHidden()) {
            Ext.Viewport.add({
                xtype: 'actionsheet',
                hideOnMaskTap: true,
                items: [{
                    text: 'Manage users'
                }, {
                    text: 'Thread options'
                }],
                listeners: {
                    hide: function() {
                        this.destroy();
                    }
                }
            }).show();
        }
    }

});
