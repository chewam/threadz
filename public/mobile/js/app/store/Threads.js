Ext.define('Tz.store.Threads', {

    extend: 'Ext.data.Store',

    config: {
        storeId: 'threads',
        model: 'Tz.model.Thread',
        sorters: ['name'],
        proxy: {
            type: 'rest',
            url: '/api/threads',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
