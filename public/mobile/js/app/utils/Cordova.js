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
        document.addEventListener("deviceready", function() {
            console.log('!!! CORDOVA READY !!!');
        }, false);
    },

    onDeviceReady: function() {
        console.log('onDeviceReady, plugins: ' + !!window.plugins);
        if (window.plugins) {
            this.initCordova();
            this.initPushNotification();
        }
    },

    initCordova: function() {
        console.log('initCordova, pause and resume events');
        // iOS <= 4
        document.addEventListener('pause', Ext.bind(this.onPause, this), false);
        document.addEventListener('resume', Ext.bind(this.onResume, this), false);
        // iOS >= 5
        document.addEventListener('resign', Ext.bind(this.onResign, this), false);
        document.addEventListener('active', Ext.bind(this.onActive, this), false);
    },

    initPushNotification: function() {
        console.log('initPushNotification');
        document.addEventListener('push-notification', Ext.bind(this.onPushNotification, this));
        this.setPushNotification(window.plugins.pushNotification);
        this.getPushNotificationStatus(
            Ext.bind(this.registerPushNotification, this)
        );
    },

    getPushNotificationStatus: function(callback) {
        var pushNotification = this.getPushNotification();

        pushNotification.getRemoteNotificationStatus(callback);
    },

    registerPushNotification: function(status) {
        var pushNotification = this.getPushNotification();

        if (status && status.enabled !== '0') {
            pushNotification.status = status;
        } else {
            pushNotification.registerDevice(
                {alert:true, badge:true, sound:true},
                Ext.bind(this.onRegisterDevice, this)
            );
        }
    },

    getPendingPushNotifications: function() {
        console.log('getPendingPushNotifications');
        var pushNotification = this.getPushNotification();

        pushNotification.getPendingNotifications(function(response) {
            var n;

            if (response.notifications && response.notifications.length) {
                for (var i = 0, l = response.notifications.length; i < l; i++) {
                    n = response.notifications[i];
                    console.log("_: " + n._);
                    console.log("applicationStateActive: " + n.applicationStateActive);
                    console.log("applicationLaunchNotification: " + n.applicationLaunchNotification);
                    console.log("timestamp: " + n.timestamp);
                    console.log("aps alert: " + n.aps.alert);
                    console.log("aps badge: " + n.aps.badge);
                }
            }
            // console.warn('Pending notifications: ' + JSON.stringify(['getPendingNotifications', notifications]));
            // navigator.notification.alert(JSON.stringify(['getPendingNotifications', notifications]));
        });
    },

    onRegisterDevice: function(status) {
        var pushNotification = this.getPushNotification();

        if (status.error) {
            console.warn('error: ' + status.error);
        } else {
            console.log('type: ' + status.type);
            console.log('pushAlert: ' + status.pushAlert);
            console.log('pushBadge: ' + status.pushBadge);
            console.log('pushSound: ' + status.pushSound);
            console.log('deviceToken: ' + status.deviceToken);
            pushNotification.status = status;
            Tz.utils.User.sendDeviceToken(status.deviceToken);
        }
    },

    onPushNotification: function(event) {
        var n = event.notification;

        console.log("_: " + n._);
        console.log("applicationStateActive: " + n.applicationStateActive);
        console.log("applicationLaunchNotification: " + n.applicationLaunchNotification);
        console.log("aps alert: " + n.aps.alert);
        console.log("aps badge: " + n.aps.badge);
    },

    onResume: function() {
        console.log('onResume');
        this.getPendingPushNotifications();
    },

    onPause: function() {
        console.log('onPause');
    },

    onActive: function() {
        console.log('onActive');
    },

    onResign: function() {
        console.log('onResign');
    }

});
