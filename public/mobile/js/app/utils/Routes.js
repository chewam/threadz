Ext.define('Tz.utils.Routes', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    requires: ['Tz.utils.Config'],

    config: {
        user: '/api/user',
        users: '/api/users',
        login: '/api/user/login',
        register: '/api/user/register',
        threads: '/api/threads',
        messages: '/api/threads/messages',
        threadsSearch: '/api/threads/search',
        sendDeviceToken: '/api/user/token'
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    applyUser: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyUsers: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyLogin: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyRegister: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyThreads: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyMessages: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applyThreadsSearch: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    },

    applySendDeviceToken: function(newValue, oldValue) {
        return Tz.utils.Config.getHost() + newValue;
    }

});
