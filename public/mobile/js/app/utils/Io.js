Ext.define('Tz.utils.Io', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        socket: null,
        events: ['message', 'disconnect']
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    connect: function() {
        var host = Tz.utils.Config.getHost(),
            socket = io.connect(host, {debug: true});

        this.setSocket(socket);
        this.addEvents();
    },

    disconnect: function() {
        this.getSocket().disconnect();
        // this.getSocket().close();
        // io.close(this.getSocket());
    },

    addEvents: function() {
        var events = this.getEvents();

        for (var i = 0, l = events.length; i < l; i++) {
            this.addEvent(events[i]);
        }
    },

    addEvent: function(event) {
        this.getSocket().on(event, Ext.bind(this.fireEvent, this, [event], 0));
    }

});
