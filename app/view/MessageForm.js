Ext.define("Tz.view.MessageForm", {

    extend: 'Ext.form.Panel',

    xtype: 'tz_messageform',

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
