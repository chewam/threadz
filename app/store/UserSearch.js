Ext.define("Cz.store.UserSearch", {

    extend: 'Ext.data.Store',

    config: {
        // autoLoad: true,
        storeId: 'usersearch',
        model: 'Cz.model.User'
        // proxy: {
        //     type: 'syncstorage',
        //     id: 'usersx',
        //     owner: 'user',
        //     access: 'private'
        // }
    }

});
