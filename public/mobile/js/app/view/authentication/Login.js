Ext.define('Tz.view.authentication.Login', {

    xtype: 'tz_authentication_login',

    extend: 'Ext.form.Panel',

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                name: 'login',
                xtype: 'textfield',
                placeHolder: 'Nickname',
                value: 'user1@threadz.com'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                placeHolder: 'Password',
                value: 'demo'
            }, {
                ui: 'action',
                xtype: 'button',
                text: 'Sign In',
                action: 'login'
            }]
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Register',
                action: 'switch'
            }]
        }]
    }

});
