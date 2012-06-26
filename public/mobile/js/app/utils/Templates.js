Ext.define('Tz.utils.Templates', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        threadItem: [
            '<div><img src="{picture}" /> {name}</div>'
        ],
        messageItem: [
            '<div>{text}</div>'
        ]
    },

    constructor: function(config) {
        this.initConfig(config);
    }

});
