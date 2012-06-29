Ext.define('Tz.view.Messages', {

    xtype: 'tz_messages',

    extend: 'Ext.List',

    config: {
        title: 'MESSAGES',
        store: 'messages',
        cls: 'tz_messages',
        itemTpl: Tz.utils.Templates.getMessageItem(),
        items: [{
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                action: 'messenger',
                text: 'Write message'
            }]
        }]
    }

});
