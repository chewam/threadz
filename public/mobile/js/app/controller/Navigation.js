Ext.define('Tz.controller.Navigation', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Navigation'],
        refs: {
            navigationPanel: {
                autoCreate: true,
                xtype: 'tz_navigation',
                selector: 'viewport > tz_navigation'
            },
            threadsPanel: {
                autoCreate: true,
                xtype: 'tz_threads',
                selector: 'viewport > tz_navigation > tz_threads'
            },
            messagesPanel: {
                autoCreate: true,
                xtype: 'tz_messages',
                selector: 'viewport > tz_navigation > tz_messages'
            }
        },
        control: {
            navigationPanel: {
                beforepop: 'onNavigationBeforePop',
                deactivate: 'onNavigationPanelDeactivate'
            },
            'tz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            }
        },
        before: {
            showThreads: ['checkSession', 'showNavigation'],
            showMessages: ['checkSession', 'showNavigation', 'showThreads']
        },
        routes: {
            'threads': 'showThreads',
            'threads/:id': 'showMessages'
        }
    },

    checkSession: function(action) {
        Tz.utils.User.checkSession(function(success) {
            if (success) action.resume();
        });
    },

    showNavigation: function(action) {
        console.log('showNavigation');
        var navigationPanel = this.getNavigationPanel();

        Ext.Viewport.add(navigationPanel);
        Ext.Viewport.setActiveItem(navigationPanel);
        action.resume();
    },

    showThreads: function(action) {
        console.log('showThreads');
        var threadsPanel = this.getThreadsPanel(),
            navigationPanel = this.getNavigationPanel();

        navigationPanel.push(threadsPanel);

        if (action) {
            Ext.defer(action.resume, 300, action);
        }
    },

    showMessages: function(threadId) {
        console.log('showMessages', this, arguments);
        var messagesPanel = this.getMessagesPanel(),
            messagesStore = messagesPanel.getStore(),
            messagesProxy = messagesStore.getProxy(),
            navigationPanel = this.getNavigationPanel(),
            url = '/api/threads/' + threadId + '/messages';

        navigationPanel.setMasked({
            xtype: 'loadmask',
            message: 'Loading messages...'
        });

        Tz.utils.Routes.setMessages(url);
        messagesProxy.setUrl(Tz.utils.Routes.getMessages());

        messagesStore.load(function() {
            navigationPanel.setMasked(false);
            navigationPanel.push(messagesPanel);
        });
    },

    onAddButtonTap: function() {
        console.log('onAddButtonTap');
    },

    onNavigationPanelDeactivate: function(panel) {
        console.log('onNavigationPanelDeactivate');
        Ext.defer(panel.destroy, 800, panel);
    },

    onNavigationBeforePop: function(navigation) {
        var history = this.getApplication().getHistory(),
            item = navigation.getPreviousItem();

        if (item && item.xtype === 'tz_threads') {
            history.add(new Ext.app.Action({
                url: 'threads'
            }), true);
        }
    }

});
