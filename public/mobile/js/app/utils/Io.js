Ext.define('Tz.utils.Io', {

    extend: 'Object',

    singleton: true,

    mixins: ['Ext.mixin.Observable'],

    config: {
        socket: null,
        host: 'http://localhost:3000'
    },

    constructor: function(config) {
        this.initConfig(config);
    },

    connect: function() {
        var host = this.getHost(),
            socket = io.connect(host);

        this.setSocket(socket);
    }

    // updateUser: function(newUser, oldUser) {

    // }

});

  
  // socket.on('news', function (data) {
  //   console.log(data);
  //   socket.emit('my other event', { my: 'data' });
  // });