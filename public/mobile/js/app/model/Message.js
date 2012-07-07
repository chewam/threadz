Ext.define('Tz.model.Message', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'text',
            'email',
            'threadId',
            {name: 'creationDate', type: 'date'},
            {name: 'picture', defaultValue: 'http://placehold.it/70x70'}
        ]
    }

});
