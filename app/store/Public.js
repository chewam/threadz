Ext.define("Tz.store.Public", {

    extend: 'Ext.data.Store',

    xtype: 'tz_publicstore',

    config: {
        autoLoad: true,
        autoSync: false,
        proxy: {
            owner: 'user',
            access: 'public',
            type: 'syncstorage'
        }
    }

});
