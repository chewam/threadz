Ext.define('Tz.view.Threads', {

    xtype: 'tz_threads',

    extend: 'Ext.List',

    config: {
        ui: 'round',
        title: 'THREADS',
        store: 'threads',
        itemTpl: Tz.utils.Templates.getThreadItem()
    }

});
