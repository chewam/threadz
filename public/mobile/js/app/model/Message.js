Ext.define('Tz.model.Message', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'text',
            'userId',
            'threadId',
            {name: 'creationDate', type: 'date'}
        ]
    }

});
