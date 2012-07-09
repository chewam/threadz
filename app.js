Ext.Loader.setPath({
    'Ext.io': 'io/src/io',
    'Ext.cf': 'io/src/cf'
});

Ext.application({
    name: 'Tz',

    viewport: {
        autoMaximize: true,
        layout: {
            type: 'card',
            animation: {
                type: 'flip',
                direction: 'left'
            }
        }
    },

    requires: [
        'Ext.MessageBox',
        'Tz.store.Public',
        'Tz.utils.Templates'
    ],

    controllers: [
        'Ext.io.Controller',    
        'Authenticate',
        'Main',
        'Users',
        'Threads',
        'Messages',
        'UserSearch'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    currentChan: null,
    currentUser: null,

    config: {
        io: {
            // authOnStartup: false,
            // manualLogin: true,
            logLevel: 'info',
            // logLevel: 'error',
            appSecret: 'wUXeRN2Lmv8khtnX',
            appId: 'OQWsUES12qzDcQTddvT4ffz1mwy'
            // authenticationView: 'Tz.view.Authenticate'
            // appId: "CXFd0Z2ccKaoySGP29smEEVd98C",
            // appSecret: "9405rg963AuFxmWE"
        }
    },

    launch: function() {
        console.log('launch app');

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
