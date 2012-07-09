Ext.define('Tz.view.Authenticate', {

    extend: 'Ext.Container',

    xtype: 'tz_authenticate',

    config: {
        layout: 'card',
        items: [{
            xtype: 'container'
        }, {
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    placeHolder: 'Username',
                    name: 'username'
                }, {
                    xtype: 'passwordfield',
                    placeHolder: 'Password',
                    name: 'password'
                }]
            }, {
                xtype: 'button',
                text: 'Sign In',
                action: 'login'
            }]
        }, {
            xtype: 'formpanel',
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'textfield',
                    placeHolder: 'Username',
                    name: 'username'
                }, {
                    xtype: 'emailfield',
                    placeHolder: 'Email',
                    name: 'email'
                }]
            }, {
                xtype: 'fieldset',
                items: [{
                    xtype: 'passwordfield',
                    placeHolder: 'Password',
                    name: 'password'
                }, {
                    xtype: 'passwordfield',
                    placeHolder: 'Confirm password',
                    name: 'password2'
                }]
            }, {
                xtype: 'button',
                text: 'Sign Up',
                action: 'register'
            }]
        }, {
            docked: 'bottom',
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'segmentedbutton',
                items: [{
                    pressed: true,
                    text: 'Sign In',
                    action: 'signin'
                }, {
                    text: 'Sign Up',
                    action: 'signup'
                }]
            }]
        }]
    },

    // extend: 'Ext.Container',

    // requires: [
    //     'Ext.TitleBar',
    //     'Ext.form.Panel',
    //     'Ext.form.FieldSet',
    //     'Ext.field.Password',
    //     'Ext.field.Email'
    // ],

    // config: {
    //     id: 'loginpanel',
    //     layout: 'fit',
    //     fullscreen: true,
        
    //     control: {
    //         'button[action=siologin]': {
    //             tap: 'doAuth'
    //         },
            
    //         'button[action=showRegister]': {
    //           tap: 'showRegister'
    //         },

    //         'button[action=sioRegister]': {
    //           tap: 'doRegister'
    //         },
            
    //         'button[action=cancellogin]': {
    //           tap: 'hideLogin'
    //         }
    //     },

 
    //     items: [
    //     {
    //         docked: 'top',
    //         xtype: 'titlebar',
    //         title: 'Login',
    //         items: [
    //         {
    //             text: 'cancel',
    //             action: 'cancellogin'
    //         },
    //          {
    //               text: 'register',
    //               action: 'showRegister',
    //               align: 'right'
    //           }
    //         ]
    //     },
    //     {
    //         xtype: 'panel',
    //         layout: 'fit',
    //         items: [
    //         {
    //             xtype: 'formpanel',
    //             items: [
    //             {
    //                 xtype: 'fieldset',
    //                 items: [
    //                 {
    //                     xtype: 'textfield',
    //                     placeHolder: 'Username',
    //                     name: 'username'
    //                 },
    //                 {
    //                     xtype: 'passwordfield',
    //                     placeHolder: 'Password',
    //                     name: 'password'
    //                 },
    //                 {
    //                     xtype: 'emailfield',
    //                     placeHolder: 'Email',
    //                     name: 'email',
    //                     hidden: true
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     text: 'Login',
    //                     action: 'siologin'
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     text: 'Register',
    //                     action: 'sioRegister',
    //                     hidden: 'true'
    //                 }
    //                 ]
    //             }
    //             ]

    //         }

    //         ]
    //     }
    //     ]
    // },

    resetForm: function() {

    },

    doAuth: function() {
        // this.fireEvent('loginUser', values);
    },

    showLoginErrors: function() {
        Ext.Msg.alert('Login Error', 'Invalid username or passsword', Ext.emptyFn);
    },

    doRegister: function() {
        // this.fireEvent('registerUser', values);
    },

    showRegister: function() {

    },

    showRegisterErrors: function(errors) {
        Ext.Msg.alert('Register Error', 'Could not create user', Ext.emptyFn);
    }

});
