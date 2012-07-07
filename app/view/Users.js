Ext.define("Tz.view.Users", {

    extend: 'Ext.List',

    xtype: 'tz_users',

    config: {
        ui: 'round',
        itemTpl: ['{name}']
    }

});
