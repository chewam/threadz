Ext.define("Cz.store.Public", {

    extend: 'Ext.data.Store',

    xtype: 'cz_publicstore',

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
