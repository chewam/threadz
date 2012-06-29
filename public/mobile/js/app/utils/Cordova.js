Ext.define('Tz.utils.Cordova', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    requires: ['Tz.utils.Config'],

    config: {
        pushNotification: null
    },

    constructor: function(config) {
        this.initConfig(config);
        Ext.onReady(this.onDeviceReady, this);
    },

    onDeviceReady: function() {
        if (this.plugins) {
            this.initPushNotification();
        }
    },

    initPushNotification: function() {
        document.addEventListener('push-notification', Ext.bind(this.onPushNotification, this));
        this.setPushNotification(window.plugins.pushNotification);
        this.registerPushNotification();
    },

    registerPushNotification: function() {
        var pushNotification = this.getPushNotification();

        pushNotification.registerDevice(
            {alert:true, badge:true, sound:true},
            Ext.bind(this.onRegisterDevice, this)
        );

    },

    onRegisterDevice: function(status) {
        console.warn(JSON.stringify(['registerDevice', status]));
        navigator.notification.alert(
            JSON.stringify(['registerDevice', status])
        );
    },

    onPushNotification: function(event) {
        console.warn(JSON.stringify(['onPushNotification', event]));
        navigator.notification.alert(
            JSON.stringify(['onPushNotification', event])
        );
    }

});
