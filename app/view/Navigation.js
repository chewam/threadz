Ext.define('Tz.view.Navigation', {

    xtype: 'tz_navigation',

    extend: 'Ext.NavigationView',

    requires: ['Ext.io.ux.AuthButton'],

    config: {
        navigationBar: {
            items: [{
                ui: 'plain',
                align: 'right',
                xtype: 'button',
                iconCls: 'plus',
                iconMask: true,
                action: 'add'
            }, {
                align: 'right',
                xtype: "sioAuthButton"
            }]
        },
        items: [{
            xtype: 'tz_threads'
        }]
    }

});
