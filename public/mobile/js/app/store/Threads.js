Ext.define('Tz.store.Threads', {

    extend: 'Ext.data.Store',

    config: {
        storeId: 'threads',
        model: 'Tz.model.Thread',
        sorters: ['name'],
        autoSync: true,
        syncRemovedRecords: false, // to remove after next sencha update
        proxy: {
            type: 'rest',
            withCredentials: true,
            url: Tz.utils.Routes.getThreads(),
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
