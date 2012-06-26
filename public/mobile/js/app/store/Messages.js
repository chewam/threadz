Ext.define('Tz.store.Messages', {

    extend: 'Ext.data.Store',

    config: {
        storeId: 'messages',
        model: 'Tz.model.Message',
        sorters: ['creationDate'],
        proxy: {
            type: 'rest',
            url: '/api/threads/messages',
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
