Ext.define('Cz.controller.ChanMessages', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['ChanMessages', 'MessagesForm'],
        models: [],
        stores: [],
        refs: {
            navigation: 'cz_navigation',
            chanMessages: 'cz_chanmessages'
        },
        control: {
            'cz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            'cz_messagesform button[action="submit"]': {
                tap: 'addMessage'
            }
            // chanUsers: {
            //     activate: 'onActivate'
            // }
        },
        before: {

        },
        routes: {

        }
    },

    init: function() {
        console.log('init chanmessages');
    },

    launch: function() {
        console.log('launch chanmessages');
    },

    onActivate: function(panel) {
        // var chanId = panel.getChanId(),
        //     store = Ext.getStore('chanz'),
        //     record = store.getById(chanId);

        // console.log('onActivate', record, panel.getStore(), chanId);
        // panel.setStore(record.usersStore);
    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'cz_chanmessages') {
            this.showMessagesForm();
        }
    },

    showMessagesForm: function() {
        this.getNavigation().push({
            xtype: 'cz_messagesform'
        });
    },

    addMessage: function(button) {
        // var messages = [],
        //     chan = Cz.app.currentChan,
        var form = button.up('cz_messagesform'),
            field = form.down('textareafield'),
            message = {
                text: field.getValue(),
                timestamp: new Date().getTime()
            };

        if (message.text && message.text.length) {
            Cz.app.fireEvent('message', message, null);
            this.getNavigation().pop();
        }


        //     chanMessages = this.getChanMessages(),
        //     store = chanMessages.getStore();
        //     // user = Cz.app.currentUser;

        // if (message && message.length) {
        //     store.add([{
        //         text: message,
        //         timestamp: new Date().getTime()
        //     }]);

        //     store.each(function(record) {
        //         messages.push(record.getData());
        //     });
        //     chan.set('messages', messages);
        //     Ext.getStore('chanz').sync(function() {
        //         this.warnChanUsers(store.last());
        //     }, this);

        //     this.getNavigation().pop();
        // }
    }

    // warnChanUsers: function(message) {
    //     var chan = Cz.app.currentChan;
    //         // messages = record.get('messages'),
    //         // message = messages[messages.length-1];
        
    //     console.log('dispatch message', message);
    //     Ext.io.Channel.get({name: chan.get('text')}, function(channel) {
    //         channel.publish({message: message.getData()}, function(error) {
    //             console.log('publish', arguments);
    //         });
    //     });
    // }

});
