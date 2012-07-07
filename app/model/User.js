Ext.define("Cz.model.User", {

    extend: 'Ext.data.Model',

    config: {
        // identifier: {
        //     type: 'uuid'
        // },
        fields: [
            {name: 'userId', type: 'string'},
            {name: 'name', type: 'string'},
            {name: 'email', type: 'string'}
            // {name: 'isAdmin', type: 'boolean', defaultValue: false}
            // {name: 'chan_id', type: 'string'}
        ]
    }

});
