Ext.define('Tz.model.User', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'email',
            {name: 'picture', defaultValue: 'http://placehold.it/70x70'}
        ]
    }

});
