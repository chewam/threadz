Ext.define("Tz.view.ThreadForm", {

    extend: 'Ext.form.Panel',

    xtype: 'tz_threadform',

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                name: 'name',
                placeHolder: 'Name',
                xtype: 'textfield'
            }, {
                action: 'submit',
                text: 'add',
                xtype: 'button'
            }]
        }]
    }

});
