Ext.define('Cz.controller.ChanMessages', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['ChanMessages', 'MessagesForm'],
        refs: {
            navigation: 'cz_navigation',
            chanMessages: 'cz_chanmessages'
        },
        control: {
            'cz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            'cz_messagesform button[action="submit"]': {
                tap: 'onMessagesFormSubmitButtonTap'
            }
        }
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

    onMessagesFormSubmitButtonTap: function(button) {
        var form = button.up('cz_messagesform'),
            field = form.down('textareafield'),
            chan = this.getApplication().currentChan,
            user = this.getApplication().currentUser,
            message = {
                userId: user.getId(),
                text: field.getValue(),
                timestamp: new Date().getTime()
            };

        chan.addMessage(message);
        this.getNavigation().pop();
    }

});
