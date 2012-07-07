Ext.define("Cz.model.Message", {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'text', type: 'string'},
            {name: 'userId', type: 'string'},
            {name: 'timestamp', type: 'int'}
        ]
    }

});
