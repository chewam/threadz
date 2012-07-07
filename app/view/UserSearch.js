Ext.define("Tz.view.UserSearch", {

    extend: 'Ext.List',

    xtype: 'tz_usersearch',

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
