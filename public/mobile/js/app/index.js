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
        'Tz.utils.Config'
        // 'JB.utils.Templates'
    ],

    controllers: [
        'Main',
        'Threads',
        'Navigation',
        'Authentication'
    ]

});
