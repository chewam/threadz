Ext.define('Cz.view.Navigation', {

    xtype: 'cz_navigation',

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
            xtype: 'cz_chanz'
        }]
    }

    // pop: function() {
    //     this.fireEvent('beforepop', this, this.getPreviousItem(), this.getActiveItem());
    //     this.callParent(arguments);
    // }

});
