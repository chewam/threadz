Ext.define('Tz.view.Authentication', {

    xtype: 'tz_authentication',

    extend: 'Ext.Container',

    requires: [
        'Tz.view.authentication.Login',
        'Tz.view.authentication.Register'
    ],

    config: {
        layout: 'card'
        // items: [{
        //     xtype: 'tz_authentication_login'
        // }, {
        //     xtype: 'tz_authentication_register'
        // }]
    }

});
