Ext.define('Tz.view.threads.Menu', {

    xtype: 'tz_threads_menu',

    extend: 'Ext.ActionSheet',

    config: {
        hideOnMaskTap: true,
        items: [{
            text: 'Find thread',
            action: 'findthread'
        }, {
            text: 'Create thread',
            action: 'createthread'
        }],
        listeners: {
            hide: function() {
                this.destroy();
            }
        }
    }

});
