Ext.define('Tz.utils.Templates', {

    // extend: '',

    singleton: true,

    config: {
        threadUsersButton: new Ext.Template([
            '{userCount} Users'
        ]),
        threadDeleteButton: new Ext.Template([
            'Delete'
        ]),
        threadMessagesButton: new Ext.Template([
            '{messageCount} Messages'
        ])
    },

    constructor: function(config) {
        this.initConfig(config);
    }
});
