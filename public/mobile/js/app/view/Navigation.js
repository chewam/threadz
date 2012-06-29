Ext.define('Tz.view.Navigation', {

    xtype: 'tz_navigation',

    extend: 'Ext.navigation.View',

    config: {
        navigationBar: {
            items: [{
                ui: 'plain',
                align: 'right',
                xtype: 'button',
                iconCls: 'settings',
                iconMask: true,
                action: 'menu'
            }]
        }
    },

    pop: function() {
        this.fireEvent('beforepop', this);
        this.callParent(arguments);
    }

});
