Ext.define('Tz.controller.Authentication', {

    extend: 'Ext.app.Controller',

    config: {
        views: ['Authentication'],
        refs: {
            authenticationPanel: {
                autoCreate: true,
                xtype: 'tz_authentication',
                selector: 'viewport > tz_authentication'
            },
            loginPanel: {
                autoCreate: true,
                xtype: 'tz_authentication_login',
                selector: 'tz_authentication > tz_authentication_login'
            },
            registerPanel: {
                autoCreate: true,
                xtype: 'tz_authentication_register',
                selector: 'tz_authentication > tz_authentication_register'
            }
        },
        control: {
            authenticationPanel: {
                deactivate: 'onAuthenticationPanelDeactivate'
            },
            'tz_authentication_login button[action="login"]': {
                tap: 'onLoginButtonTap'
            },
            'tz_authentication_login button[action="switch"]': {
                tap: 'onLoginSwitchButtonTap'
            },
            'tz_authentication_register button[action="register"]': {
                tap: 'onRegisterButtonTap'
            },
            'tz_authentication_register button[action="switch"]': {
                tap: 'onRegisterSwitchButtonTap'
            }
        },
        before: {
            showLogin: ['showAuthentication'],
            showRegister: ['showAuthentication']
        },
        routes: {
            'authentication/login': 'showLogin',
            'authentication/register': 'showRegister'
        }
    },

    // login: function() {
    //     var loginPanel = this.getLoginPanel(),
    //         values = loginPanel.getValues();

    //     console.log('login', values);

    //     if (values.login.length && values.password.length) {
    //         Ext.Ajax.request({
    //             scope: this,
    //             params: values,
    //             url: '/api/user/login',
    //             success: function(response) {
    //                 console.log('success', this, arguments);
    //                 response = Ext.decode(response.responseText);
    //                 if (response.success) {
    //                     var user = Ext.create('Tz.model.User', values);
    //                     Tz.utils.User.setRecord(user);
    //                     Tz.utils.Io.connect();
    //                     this.redirectTo('');
    //                 } else {
    //                     Ext.Msg.alert('Error', response.error);
    //                 }
    //             },
    //             failure: function() {
    //                 console.error('failure', this, arguments);
    //                 Ext.Msg.alert('Error', 'cannot reach server');
    //             }
    //         });
    //     }
    // },

    // register: function() {
    //     var registerPanel = this.getRegisterPanel(),
    //         values = registerPanel.getValues();

    //     console.log('register', values);

    //     if (values.login.length && values.password.length && values.password === values.password2) {
    //         Ext.Ajax.request({
    //             scope: this,
    //             params: values,
    //             url: '/api/user/register',
    //             success: function(response) {
    //                 console.log('success', this, arguments);
    //                 response = Ext.decode(response.responseText);
    //                 if (response.success) {
    //                     var user = Ext.create('Tz.model.User', values);
    //                     Tz.utils.Config.setUser(user);
    //                     Tz.utils.Io.connect();
    //                     this.redirectTo('');
    //                 } else {
    //                     Ext.Msg.alert('Error', response.error);
    //                 }
    //             },
    //             failure: function() {
    //                 console.error('failure', this, arguments);
    //                 Ext.Msg.alert('Error', 'cannot reach server');
    //             }
    //         });
    //     }
    // },

    showAuthentication: function(action) {
        console.log('showAuthentication');
        var authenticationPanel = this.getAuthenticationPanel();

        Ext.Viewport.add(authenticationPanel);
        Ext.Viewport.setActiveItem(authenticationPanel);
        action.resume();
    },

    showLogin: function() {
        console.log('showLogin');
        var loginPanel = this.getLoginPanel(),
            authenticationPanel = this.getAuthenticationPanel();

        authenticationPanel.add(loginPanel);
        authenticationPanel.setActiveItem(loginPanel);
    },

    showRegister: function() {
        console.log('showRegister');
        var registerPanel = this.getRegisterPanel(),
            authenticationPanel = this.getAuthenticationPanel();

        authenticationPanel.add(registerPanel);
        authenticationPanel.setActiveItem(registerPanel);
    },

    onLoginButtonTap: function() {
        console.log('onLoginButtonTap');
        var loginPanel = this.getLoginPanel(),
            values = loginPanel.getValues();

        Tz.utils.User.login(values, function() {
            this.redirectTo('');
        }, this);
    },

    onRegisterButtonTap: function() {
        console.log('onRegisterButtonTap');
        var registerPanel = this.getRegisterPanel(),
            values = registerPanel.getValues();

        Tz.utils.User.register(values, function() {
            this.redirectTo('');
        }, this);
    },

    onLoginSwitchButtonTap: function() {
        this.redirectTo('authentication/register');
    },

    onRegisterSwitchButtonTap: function() {
        this.redirectTo('authentication/login');
    },

    onAuthenticationPanelDeactivate: function(panel) {
        console.log('onAuthenticationPanelDeactivate');
        Ext.defer(panel.destroy, 800, panel);
    }

});
