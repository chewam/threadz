Ext.define('Tz.utils.Templates', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        threadItem: [
            '<div class="picture" style="background-image:url({picture})"></div>',
            '<div class="info">',
                '<div>{name}</div>',
                '<tpl if="isAdmin"><div>admin</div></tpl>',
                '<tpl if="unread"><div>unread: {unread}</div></tpl>',
            '</div>'
        ],
        messageItem: [
            '<div class="info">',
                '<div class="name">{email}</div>',
                '<div class="text">{text}</div>',
            '</div>',
            '<div class="date">{[Ext.Date.format(values.creationDate, \'H:i d/m/Y\')]}</div>'
        ]
    },

    constructor: function(config) {
        this.initConfig(config);
    }

});
