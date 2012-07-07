Ext.define("Tz.store.Threads", {

    extend: 'Ext.data.Store',

    config: {
        autoLoad: true,
        autoSync: false,
        storeId: 'threads',
        model: 'Tz.model.Thread',
        proxy: {
            type: 'syncstorage',
            id: 'threads_dev',
            owner: 'user',
            access: 'private'
        },
        listeners: {
            load: function() {
                console.warn('threads store load', arguments);
                this.each(function(record) {
                    this.addThreadListener(record);
                }, this);
            },
            beforesync: function() {
                console.warn('threads store sync', arguments);
            },
            addrecords: function() {
                console.warn('threads store addrecords', arguments);
            },
            updaterecord: function() {
                console.warn('threads store updaterecord', arguments);
            },
            removerecords: function() {
                console.warn('threads store removerecords', arguments);
            },
            refresh: function() {
                console.warn('threads store refresh', arguments);
            }
        }
    },

    addThreadListener: function(thread) {
        var id =  thread.getThreadId();

        console.error('listenChan', thread, id);

        Ext.io.Channel.get({name: id}, function(channel) {
            channel.on({
                scope: this,
                message: function(sender, message) {
                    console.log('channel message', message, sender, chan.getThreadId());
                    this['on' + Ext.String.capitalize(message.type)](chan);
                }
            });
        }, this);
    },

    onRemove: function(thread) {
        console.log('thread onDestroy', thread);
        this.remove(thread);
        this.sync();
    },

    onJoin: function(thread) {
        console.log('thread onJoin', thread);
        thread.getUsers().sync();
    },

    onQuit: function(thread) {
        console.log('thread onQuit', this);
        thread.getUsers().sync();
    },

    onMessage: function(thread) {
        console.log('thread onMessage', this);
        thread.getMessages().sync();
    }

});
