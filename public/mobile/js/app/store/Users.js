Ext.define('Tz.store.Users', {

    extend: 'Ext.data.Store',

    config: {
        storeId: 'users',
        model: 'Tz.model.User',
        sorters: ['email'],
        syncRemovedRecords: false, // to remove after next sencha update
        proxy: {
            type: 'rest',
            withCredentials: true,
            url: Tz.utils.Routes.getUsers(),
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
