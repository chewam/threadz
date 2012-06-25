Ext.define('Tz.controller.Main', {

    extend: 'Ext.app.Controller',

    config: {
        // views: [],
        models: ['User'],
        // stores: ['Users'],
        refs: {
            authenticationPanel: {
                autoCreate: true,
                xtype: 'tz_authentication',
                selector: 'viewport > tz_authentication'
            },
            navigationPanel: {
                autoCreate: true,
                xtype: 'tz_navigation',
                selector: 'viewport > tz_navigation'
            }
        },
        control: {

        },
        before: {
            showNavigation: ['checkSession']
        },
        routes: {
            '': 'showNavigation'
            // 'authentication': 'showAuthentication'
        }
    },

    checkSession: function(action) {
        console.log('checkSession');
        if (Tz.utils.Config.getUser()) {
            action.resume();
        } else {
            this.redirectTo('authentication/login');
        }
    },

    showNavigation: function() {
        console.log('showHome');
        var navigationPanel = this.getNavigationPanel();

        Ext.Viewport.add(navigationPanel);
        Ext.Viewport.setActiveItem(navigationPanel);
    }

    // showAuthentication: function() {
    //     console.log('showAuthentication');
    //     var authenticationPanel = this.getAuthenticationPanel();

    //     Ext.Viewport.add(authenticationPanel);
    //     Ext.Viewport.setActiveItem(authenticationPanel);
    // }

});
