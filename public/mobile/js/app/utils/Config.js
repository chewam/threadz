Ext.define('Tz.utils.Config', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        user: null
    },

    constructor: function(config) {
        this.initConfig(config);
    }

    // updateUser: function(newUser, oldUser) {

    // }

});
