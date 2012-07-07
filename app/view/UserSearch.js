Ext.define("Cz.view.UserSearch", {

    extend: 'Ext.List',

    xtype: 'cz_usersearch',

    requires: [
        'Ext.Toolbar',
        'Ext.field.Search'
    ],

    config: {
        ui: 'round',
        store: 'usersearch',
        itemTpl: [
            '{name}'
        ],
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                flex: 1,
                xtype: 'searchfield'
            }]
        }]
    }

});
