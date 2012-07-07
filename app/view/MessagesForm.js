Ext.define("Cz.view.MessagesForm", {

    extend: 'Ext.form.Panel',

    xtype: 'cz_messagesform',

    requires: [
        'Ext.field.TextArea'
    ],

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                name: 'text',
                label: 'message',
                xtype: 'textareafield'
            }, {
                action: 'submit',
                text: 'Send',
                xtype: 'button'
            }]
        }]
    }

});
