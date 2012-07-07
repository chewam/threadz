Ext.define('Tz.controller.Messages', {

    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Messages',
            'Messenger',
            'messages.Menu'
            // 'messages.Users'
        ],
        refs: {
            navigationPanel: 'tz_navigation',
            usersPanel: 'viewport > tz_messages_users',
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
            },
            'viewport > tz_messages_menu button[action="users"]': {
                tap: 'onUsersButtonTap'
            },
            'tz_messages_users button[action="close"]': {
                tap: 'onUsersCloseButtonTap'
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

    showMenu: function() {
        Ext.Viewport.add({
            xtype: 'tz_messages_menu'
        }).show();
    },

    showUsers: function() {
        Ext.Viewport.add({
            xtype: 'tz_messages_users'
        }).show();
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
            this.showMenu();
        }
    },

    onUsersButtonTap: function(button) {
        button.up('actionsheet').hide();
        Ext.defer(this.showUsers, 300, this);
    },

    onUsersCloseButtonTap: function(button) {
        var usersPanel = this.getUsersPanel();

        usersPanel.hide();
    }

});
