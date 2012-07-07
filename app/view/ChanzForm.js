Ext.define("Cz.view.ChanzForm", {

    extend: 'Ext.form.Panel',

    xtype: 'cz_chanzform',

    requires: [

    ],

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                name: 'text',
                label: 'name',
                xtype: 'textfield'
            }, {
                action: 'submit',
                text: 'add',
                xtype: 'button'
            }]
        }]
    }

});
