Ext.define('Cz.view.chanz.Item', {

    extend: 'Ext.dataview.component.DataItem',

    xtype: 'cz_chanz_item',

    config: {
        // nameButton: true,
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

Ext.define("Cz.view.Chanz", {

    extend: 'Ext.DataView',

    xtype: 'cz_chanz',

    requires: [
        // 'Cz.store.Chanz'
    ],

    config: {
        // ui: 'round',
        store: 'chanz',
        useComponents: true,
        defaultType: 'cz_chanz_item'
    }

});
