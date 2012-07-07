Ext.application({

    name: 'Tz',

    appFolder: 'js/app',

    viewport: {
        autoMaximize : true,
        layout: {
            type: 'card',
            animation: {
                type: 'flip',
                direction: 'left'
            }
        }
    },

    requires: [
        'Tz.utils.Config',
        'Tz.utils.Io',
        'Tz.utils.User',
        'Tz.utils.Routes',
        'Tz.utils.Cordova',
        'Tz.utils.Templates'
    ],

    models: [
        'User',
        'Thread',
        'Message'
    ],

    stores: [
        'Users',
        'Threads',
        'Messages'
    ],

    controllers: [
        'Main',
        'Threads',
        'threads.Search',
        'Messages',
        'messages.Users',
        // 'Messenger',
        'Navigation',
        'Authentication'
    ]

});
