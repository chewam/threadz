Ext.define('Tz.store.Messages', {

    extend: 'Ext.data.Store',

    config: {
        autoSync: true,
        storeId: 'messages',
        model: 'Tz.model.Message',
        syncRemovedRecords: false, // to remove after next sencha update
        sorters: [{
            direction: 'DESC',
            property: 'creationDate'
        }],
        proxy: {
            type: 'rest',
            withCredentials: true,
            url: Tz.utils.Routes.getMessages(),
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        }
    }

});
