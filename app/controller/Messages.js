Ext.define('Tz.controller.Messages', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Messages', 'MessageForm'],
        refs: {
            navigation: 'tz_navigation',
            chanMessages: 'tz_messages'
        },
        control: {
            'tz_navigation button[action="add"]': {
                tap: 'onAddButtonTap'
            },
            'tz_messageform button[action="submit"]': {
                tap: 'onMessageFormSubmitTap'
            }
        }
    },

    onAddButtonTap: function() {
        var activePanel = this.getNavigation().getActiveItem();

        if (activePanel.xtype === 'tz_messages') {
            this.showMessageForm();
        }
    },

    showMessageForm: function() {
        this.getNavigation().push({
            xtype: 'tz_messageform'
        });
    },

    onMessageFormSubmitTap: function(button) {
        var form = button.up('tz_messageform'),
            field = form.down('textareafield'),
            user = this.getApplication().currentUser,
            thread = this.getApplication().currentThread,
            message = {
                userId: user.getId(),
                text: field.getValue(),
                timestamp: new Date().getTime()
            };

        thread.addMessage(message);

        this.getNavigation().pop();
    }

});
