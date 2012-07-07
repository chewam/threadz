Ext.define("Cz.store.Chanz", {

    extend: 'Ext.data.Store',

    config: {
        autoLoad: true,
        autoSync: false,
        storeId: 'chanz',
        model: 'Cz.model.Chan',
        proxy: {
            type: 'syncstorage',
            id: 'chanz2',
            owner: 'user',
            access: 'private'
            // type: 'localstorage',
            // id: 'chanz'
        },
        listeners: {
            load: function() {
                console.warn('chanz store load', arguments);
                this.each(function(record) {
                    this.listenChan(record);
                    // this.bindChannel(record);
                }, this);
            },
            beforesync: function() {
                console.warn('chanz store sync', arguments);
            },
            addrecords: function() {
                console.warn('chanz store addrecords', arguments);
            },
            updaterecord: function() {
                console.warn('chanz store updaterecord', arguments);
            },
            removerecords: function() {
                console.warn('chanz store removerecords', arguments);
            },
            refresh: function() {
                console.warn('chanz store refresh', arguments);
            }
        }
    },

    getChan: function(chanId) {

    },

    listenChan: function(chan) {
        var id =  chan.getChanId();

        console.error('listenChan', chan, id);

        Ext.io.Channel.get({name: id}, function(channel) {
            channel.on({
                scope: this,
                message: function(sender, message) {
                    console.log('channel message', message, sender, chan.getChanId());
                    this['on' + Ext.String.capitalize(message.type)](chan);
                }
            });
        }, this);
    },

    onRemove: function(chan) {
        console.log('chan onDestroy', chan);
        this.remove(chan);
        this.sync();
        // this.removeMessages();
        // this.removeUsers();
        // this.destroy();
    },

    onJoin: function(chan) {
        console.log('chan onJoin', this);
        chan.getUsers().sync();
    },

    onQuit: function(chan) {
        console.log('chan onQuit', this);
        chan.getUsers().sync();
    },

    onMessage: function(chan) {
        console.log('chan onMessage', this);
        chan.getMessages().sync();
    }
    // bindChannel: function(record) {
    //     var id =  record.getChanId();

    //     console.log('bindChannel', record, id);

    //     Ext.io.Channel.get({name: id}, function(channel) {
    //         channel.on({
    //             scope: this,
    //             message: function(sender, message) {
    //                 console.log('channel message', message, sender);
    //             }
    //         });
    //     }, this);
    // }

});
