Ext.define("Cz.store.Messages", {

    extend: 'Ext.data.Store',

    config: {
        storeId: 'messages',
        model: 'Cz.model.Message'
        // listeners: {
        //     addrecords: 'onMessageAdd'
        // }
    },

    onMessageAdd: function() {
        // var messages = [],
        //     chan = Cz.app.currentChan;

        // console.log('onMessageAdd', chan, messages);
        // if (chan) {
        //     this.each(function(record) {
        //         messages.push(record.getData());
        //     });
        //     chan.set('messages', messages);
        // }
    }

});
