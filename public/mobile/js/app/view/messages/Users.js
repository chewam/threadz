Ext.define('Tz.view.messages.Users', {

    xtype: 'tz_messages_users',

    extend: 'Ext.Sheet',

    config: {
        layout: 'fit',
        stretchX: true,
        stretchY: true,
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'THREAD USERS',
            items: [{
                flex: 1,
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'close',
                action: 'close'
            }]
        // }, {
        //     docked: 'top',
        //     xtype: 'toolbar',
        //     items: [{
        //         flex: 1,
        //         xtype: 'searchfield',
        //         placeHolder: 'Look for a thread...'
        //     }]
        }, {
            xtype: 'list',
            store: 'users',
            itemTpl: Tz.utils.Templates.getUserItem()
        }],
        listeners: {
            hide: function() {
                this.destroy();
            }
        }
    }

});
