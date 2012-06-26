Ext.define('Tz.controller.Navigation', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Navigation'],
        refs: {
            navigationPanel: 'tz_navigation'
        },
        control: {

        },
        before: {

        },
        routes: {
            'threads/:id': 'showMessages',
            'threads/:id/messenger': 'showMessenger'
        }
    },

    showMessages: function(threadId) {
        console.log('showMessages', this, arguments);
        var messagesPanel,
            messagesStore,
            messagesProxy,
            navigationPanel = this.getNavigationPanel(),
            url = '/api/threads/' + threadId + '/messages';

        messagesPanel = navigationPanel.push({
            xtype: 'tz_messages'
        });

        messagesStore = messagesPanel.getStore();
        messagesProxy = messagesStore.getProxy();
        messagesProxy.setUrl(url);
        messagesStore.load();
    },

    showMessenger: function() {
        var navigationPanel = this.getNavigationPanel();

        navigationPanel.push({
            xtype: 'tz_messenger'
        });
    }

});
