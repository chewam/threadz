Ext.define('Tz.controller.Authenticate', {

    extend: 'Ext.app.Controller',

    requires: ['Ext.SegmentedButton'],

    config: {
        interval: 600,
        views: ['Authenticate'],
        refs: {
            authenticate: 'tz_authenticate'
        },
        control: {
            authenticate: {
                activate: 'onActivate'
            },
            'tz_authenticate button[action="signin"]': {
                tap: 'onSignInButtonTap'
            },
            'tz_authenticate button[action="signup"]': {
                tap: 'onSignUpButtonTap'
            },
            'tz_authenticate button[action="login"]': {
                tap: 'onLoginButtonTap'
            },
            'tz_authenticate button[action="register"]': {
                tap: 'onRegisterButtonTap'
            }
        }
    },

    getAnimation: function() {
        return {
            type:'slide',
            duration: 300,
            direction:'up',
            easing: 'ease-in-out'
        };
    },

    showSignIn: function() {
        this.showCard(1, 'down');
    },

    showSignUp: function() {
        this.showCard(2, 'down');
    },

    showBlank: function() {
        this.showCard(0);
    },

    showCard: function(itemIndex, direction) {
        var authenticate = this.getAuthenticate(),
            layout = authenticate.getLayout(),
            animation = this.getAnimation();

        animation.direction = direction || 'up';
        layout.setAnimation(animation);
        authenticate.setActiveItem(itemIndex);
    },

    doLogin: function(data) {
        // Ext.io.User.authenticate(data, function(user, errors) {
        //     if (user) {
        //         this.onAuth(user);
        //     } else {
        //         this.showError();
        //     }
        // }, this);
        // this.getApplication().onAuth(data);
        this.getApplication().sio.onLoginUser(data);
    },

    doRegister: function(data) {
        // var authenticate = this.getAuthenticate();

        // authenticate.fireEvent('registerUser', data);
        this.getApplication().sio.registerUser(data);
    },

    resetForms: function() {
        var forms = this.getAuthenticate().query('formpanel');

        forms.forEach(function(form) {
            form.reset();
        });
    },

    // showError: function() {
    //     Ext.Msg.alert('Login Error', 'cannot authenticate');
    // },

    onActivate: function() {
        Ext.defer(this.showSignIn, this.getInterval(), this);
    },

    onAuth: function(user) {
        // user.on("message", function(sender, message) {
        //     this.fireEvent("usermessage", sender, message);
        // }, this);
        
            // this.hideLogin();
        this.fireEvent("authorized", user);
    },

    onSignInButtonTap: function() {
        this.showBlank();
        Ext.defer(this.showSignIn, this.getInterval(), this);
    },

    onSignUpButtonTap: function() {
        this.showBlank();
        Ext.defer(this.showSignUp, this.getInterval(), this);
    },

    onLoginButtonTap: function(button) {
        var form = button.up('formpanel'),
            values = form.getValues();

        this.doLogin(values);
    },

    onRegisterButtonTap: function(button) {
        var form = button.up('formpanel'),
            values = form.getValues();

        this.doRegister(values);
    }

});
