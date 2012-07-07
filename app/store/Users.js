Ext.define("Cz.store.Users", {

    extend: 'Ext.data.Store',

    config: {
        // autoLoad: true,
        storeId: 'users',
        model: 'Cz.model.User',
        listeners: {
            addrecords: 'onUserAdd'
            // addrecords: function() {
            //     this.onUserAdd()
            // }
        }
        // proxy: {
        //     type: 'syncstorage',
        //     id: 'usersx',
        //     owner: 'user',
        //     access: 'private'
        // }
    },

    onUserAdd: function() {
        // var users = [],
        //     // records = this.getRange(),
        //     chan = Cz.app.currentChan;

        // console.log('onUserAdd', chan, users);
        // if (chan) {
        //     this.each(function(record) {
        //         users.push(record.getData());
        //     });
        //     chan.set('users', users);
        //     Ext.getStore('chanz').sync();
        //     // chan.sync();
        // }
    }

});
