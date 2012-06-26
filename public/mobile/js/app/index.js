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
        'Tz.utils.Io',
        'Tz.utils.Config',
        'Tz.utils.Templates'
    ],

    models: [
        'User',
        'Thread',
        'Message'
    ],

    stores: [
        'Threads',
        'Messages'
    ],

    controllers: [
        'Main',
        'Threads',
        'Messages',
        'Messenger',
        'Navigation',
        'Authentication'
    ]

});
