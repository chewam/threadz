Ext.define('Tz.model.Thread', {

    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'name',
            'userId',
            {name: 'isAdmin', type: 'boolean'},
            {name: 'isGranted', type: 'boolean'},
            {name: 'unread', type: 'int', defaultValue: 0},
            {name: 'picture', defaultValue: 'http://placehold.it/70x70'}
        ]
    }

});
