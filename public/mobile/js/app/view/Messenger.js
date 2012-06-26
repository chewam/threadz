Ext.define('Tz.view.Messenger', {

    xtype: 'tz_messenger',

    extend: 'Ext.form.Panel',

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textareafield'
            }]
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                action: 'send',
                text: 'Send'
            }]
        }]
    }

});
