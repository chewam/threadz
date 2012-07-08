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
                setHtml: 'name'
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
        var text, action, tplName,
            actions = this.getActions();

        this.callParent(arguments);

        actions.query('button').forEach(function(button) {
            action = Ext.String.capitalize(button.action),
            tplName = 'Thread' + action + 'Button',
            tpl = Tz.utils.Templates['get' + tplName](),
            text = tpl.apply(record.getData());

            button.setRecord(record);
            button.setText(text);
            console.log('BUTTON', button);
        });
    }
});

Ext.define("Tz.view.Threads", {

    extend: 'Ext.DataView',

    xtype: 'tz_threads',

    config: {
        store: 'threads',
        useComponents: true,
        defaultType: 'tz_threads_item'
    }

});
