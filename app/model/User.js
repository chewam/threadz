Ext.define("Tz.model.User", {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'userId', type: 'string'}
        ]
    }

});
