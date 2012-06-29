Ext.define('Tz.view.threads.Form', {

    xtype: 'tz_threads_form',

    extend: 'Ext.Sheet',

    config: {
        layout: 'fit',
        stretchX: true,
        stretchY: true,
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'THREAD FORM',
            items: [{
                flex: 1,
                xtype: 'spacer'
            }, {
                xtype: 'button',
                iconCls: 'close',
                action: 'close'
            }]
        }, {
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                items: [{
                    name: 'name',
                    xtype: 'textfield',
                    placeHolder: 'Thread name'
                }, {
                    xtype: 'button',
                    action: 'submit',
                    text: 'submit'
                }]
            }]
        }],
        listeners: {
            hide: function() {
                this.destroy();
            }
        }
    }

});
