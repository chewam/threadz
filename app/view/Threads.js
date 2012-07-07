Ext.define('Tz.view.threads.Item', {

    extend: 'Ext.dataview.component.DataItem',

    xtype: 'tz_threads_item',

    config: {
        details: true,
        actions: {
            docked: 'bottom',
            layout: 'hbox',
            items: [{
                flex: 1,
                xtype: 'button',
                text: 'Delete',
                action: 'delete'
            }, {
                flex: 1,
                xtype: 'button',
                text: 'Users',
                action: 'users'
            }, {
                flex: 1,
                xtype: 'button',
                text: 'Messages',
                action: 'messages'
            }]
        },
        dataMap: {
            getDetails: {
                setHtml: 'text'
            }
        }
    },

    applyDetails: function(config) {
        return Ext.factory(config, Ext.Container, this.getDetails());
    },

    updateDetails: function(newComponent, oldComponent) {
        if (oldComponent) {
            this.remove(oldComponent);
        }
        if (newComponent) {
            this.add(newComponent);
        }
    },

    applyActions: function(config) {
        return Ext.factory(config, Ext.Container, this.getActions());
    },

    updateActions: function(newComponent, oldComponent) {
        if (oldComponent) {
            this.remove(oldComponent);
        }
        if (newComponent) {
            this.add(newComponent);
        }
    },

    updateRecord: function(record) {
        var actions = this.getActions();

        this.callParent(arguments);

        actions.query('button').forEach(function(button) {
            button.setRecord(record);
        });
    }
});

Ext.define("Tz.view.Threads", {

    extend: 'Ext.DataView',

    xtype: 'tz_threads',

    requires: [
        // 'Tz.storethreadsChanz'
    ],

    config: {
        // ui: 'round',
        store: 'threads',
        useComponents: true,
        defaultType: 'tz_threads_item'
    }

});
