Ext.define('Tz.model.Message', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'text',
            'email',
            'threadId',
            {name: 'creationDate', type: 'date'/*, defaultValue: new Date()*/}
        ]
    }

});
