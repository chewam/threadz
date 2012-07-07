Ext.define('Tz.view.messages.Menu', {

    xtype: 'tz_messages_menu',

    extend: 'Ext.ActionSheet',

    config: {
        hideOnMaskTap: true,
        items: [{
            action: 'users',
            text: 'Manage users'
        }, {
            text: 'Thread options'
        }],
        listeners: {
            hide: function() {
                this.destroy();
            }
        }
    }

});
