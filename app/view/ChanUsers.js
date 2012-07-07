Ext.define("Cz.view.ChanUsers", {

    extend: 'Ext.List',

    xtype: 'cz_chanusers',

    config: {
        ui: 'round',
        // chanId: null,
        itemTpl: [
            '{name}'
        ]
        // store: 'users'
    }

});
