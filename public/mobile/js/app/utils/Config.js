Ext.define('Tz.utils.Config', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        host: 'http://192.168.1.41:3000'
    },

    constructor: function(config) {
        this.initConfig(config);
    }

});
