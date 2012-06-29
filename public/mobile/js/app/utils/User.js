Ext.define('Tz.utils.User', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        record: null
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    checkSession: function(callback, scope) {
        if (this.getRecord()) {
            callback.call(scope, true);
        } else {
            this.load(callback, scope);
        }
    },

    load: function(callback, scope) {
        Ext.Ajax.request({
            scope: this,
            withCredentials: true,
            url: Tz.utils.Routes.getUser(),
            success: function(response) {
                console.log('success', this, arguments);
                var data = Ext.decode(response.responseText);
                record = Ext.create('Tz.model.User', data);
                this.setRecord(record);
                Tz.utils.Io.connect();
                callback.call(scope, record);
            }
        });
    },

    login: function(params, callback, scope) {

        console.log('login', params, Tz.utils.Routes.getLogin());

        if (params.login.length && params.password.length) {
            Ext.Ajax.request({
                scope: this,
                params: params,
                withCredentials: true,
                url: Tz.utils.Routes.getLogin(),
                success: function(response) {
                    console.log('success', this, arguments);
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        var user = Ext.create('Tz.model.User', params);
                        this.setRecord(user);
                        Tz.utils.Io.connect();
                        callback.call(scope);
                    } else {
                        Ext.Msg.alert('Error', response.error);
                    }
                },
                failure: function() {
                    Ext.Msg.alert('Error', 'cannot reach server');
                }
            });
        }
    },

    register: function(params, callback, scope) {

        console.log('register', params);

        if (params.login.length && params.password.length && params.password === params.password2) {
            Ext.Ajax.request({
                scope: this,
                params: params,
                withCredentials: true,
                url: Tz.utils.Routes.getRegister(),
                success: function(response) {
                    console.log('success', this, arguments);
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        var user = Ext.create('Tz.model.User', params);
                        this.setRecord(user);
                        Tz.utils.Io.connect();
                        callback.call(scope);
                    } else {
                        Ext.Msg.alert('Error', response.error);
                    }
                },
                failure: function() {
                    console.error('failure', this, arguments);
                    Ext.Msg.alert('Error', 'cannot reach server');
                }
            });
        }
    },

    logout: function(message, callback, scope) {
        Tz.utils.User.setRecord(null);
        Ext.Msg.alert('Error', message, callback, scope);
    }

});
