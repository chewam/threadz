Ext.define('Tz.model.Thread', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'name',
            'userId',
            {name: 'picture', defaultValue: 'http://placehold.it/70x70'}
        ]
    }

});
