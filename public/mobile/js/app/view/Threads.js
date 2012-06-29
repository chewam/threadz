Ext.define('Tz.view.Threads', {

    xtype: 'tz_threads',

    extend: 'Ext.List',

    config: {
        ui: 'round',
        title: 'THREADS',
        store: 'threads',
        cls: 'tz_threads',
        itemTpl: Tz.utils.Templates.getThreadItem()
    }

});
