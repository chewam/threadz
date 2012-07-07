Ext.define('Tz.view.threads.Search', {

    xtype: 'tz_threads_search',

    extend: 'Ext.Sheet',

    config: {
        layout: 'fit',
        stretchX: true,
        stretchY: true,
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'THREAD SEARCH',
            items: [{
                flex: 1,
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'close',
                action: 'close'
            }]
        }, {
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                flex: 1,
                xtype: 'searchfield',
                placeHolder: 'Look for a thread...'
            }]
        }, {
            xtype: 'list',
            // store: 'threads',
            store: Ext.create('Tz.store.Threads', {
                proxy: {
                    url: Tz.utils.Routes.getThreadsSearch()
                }
            }),
            itemTpl: Tz.utils.Templates.getThreadItem()
        }],
        listeners: {
            hide: function() {
                this.destroy();
            }
        }
    }

});
