Ext.define('Tz.view.authentication.Register', {

    xtype: 'tz_authentication_register',

    extend: 'Ext.form.Panel',

    config: {
        items: [{
            xtype: 'fieldset',
            items: [{
                name: 'login',
                xtype: 'textfield',
                placeHolder: 'Email'
            }, {
                name: 'password',
                xtype: 'passwordfield',
                margin: '8 0 0 0',
                placeHolder: 'Password'
            }, {
                name: 'password2',
                xtype: 'passwordfield',
                placeHolder: 'Repeat password'
            }, {
                ui: 'action',
                xtype: 'button',
                text: 'Sign In',
                action: 'register'
            }]
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: 'Login',
                action: 'switch'
            }]
        }]
    }

});
