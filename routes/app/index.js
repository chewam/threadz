exports.index = function(req, res) {
    res.render('app', {
        layout: false,
        host: 'http://192.168.1.41:3000'
    });
};
