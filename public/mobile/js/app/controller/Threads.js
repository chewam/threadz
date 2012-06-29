Ext.define('Tz.controller.Threads', {

    extend: 'Ext.app.Controller',

    config: {
        views: [
            'Threads',
            'threads.Menu',
            'threads.Form'
        ],
        refs: {
            threadsPanel: 'tz_navigation > tz_threads',
            threadsForm: 'tz_threads_form',
            searchPanel: 'tz_threads_search'
            // messagesPanel: 'tz_navigation > tz_messages'
        },
        control: {
            threadsPanel: {
                itemtap: 'onThreadsPanelItemTap',
                activate: 'onThreadsPanelActivate'
            },
            'tz_navigation button[action="menu"]': {
                tap: 'onMenuButtonTap'
            },
            'viewport > tz_threads_menu button[action="createthread"]': {
                tap: 'onCreateThreadButtonTap'
            },
            'viewport > tz_threads_menu button[action="findthread"]': {
                tap: 'onFindThreadButtonTap'
            },
            'tz_threads_form button[action="submit"]': {
                tap: 'onFormSubmitButtonTap'
            },
            'tz_threads_form button[action="close"]': {
                tap: 'onFormCloseButtonTap'
            },
            'tz_threads_search button[action="close"]': {
                tap: 'onSearchCloseButtonTap'
            }
        }
    },

    init: function() {
        Tz.utils.Io.on('message', this.onMessage, this);
    },

    showMenu: function() {
        Ext.Viewport.add({
            xtype: 'tz_threads_menu'
        }).show();
    },

    showThreadForm: function() {
        Ext.Viewport.add({
            xtype: 'tz_threads_form'
        }).show();
    },

    showThreadSearch: function() {
        Ext.Viewport.add({
            xtype: 'tz_threads_search'
        }).show();
    },

    onThreadsPanelActivate: function(panel) {
        console.log('onThreadsPanelActivate');
        var store = panel.getStore();

        store.load();
    },

    onThreadsPanelItemTap: function(list, index, target, record) {
        var id = record.get('id'),
            route = 'threads/' + id;

        record.set('unread', 0);

        this.redirectTo(route);
    },

    onMessage: function(message) {
        console.log('onMessage', this, arguments);
        var threadsPanel = this.getThreadsPanel(),
            // messagesPanel = this.getMessagesPanel(),
            store = threadsPanel.getStore(),
            record = store.getById(message.threadId);

        if (record) {
            record.set('unread', record.get('unread') + 1);
        }

        // if (messagesPanel) {
        //     store = messagesPanel.getStore();
        //     store.add(message);
        //     // record = store.getById(message.threadId);
        // }
    },

    onMenuButtonTap: function() {
        var threadsPanel = this.getThreadsPanel();

        if (threadsPanel && !threadsPanel.isHidden()) {
            this.showMenu();
        }
    },

    onCreateThreadButtonTap: function(button) {
        button.up('actionsheet').hide();
        Ext.defer(this.showThreadForm, this);
    },

    onFindThreadButtonTap: function(button) {
        button.up('actionsheet').hide();
        Ext.defer(this.showThreadSearch, this);
    },

    onFormSubmitButtonTap: function() {
        var threadsForm = this.getThreadsForm(),
            threadsPanel = this.getThreadsPanel(),
            values = threadsForm.getValues(),
            store = threadsPanel.getStore();

        store.add(values);
        threadsForm.hide();
        // store.sync();
    },

    onFormCloseButtonTap: function() {
        var threadsForm = this.getThreadsForm();

        threadsForm.hide();
    },

    onSearchCloseButtonTap: function() {
        var searchPanel = this.getSearchPanel();

        searchPanel.hide();
    }

});
