exports.site = require('./site');

exports.api = require('./api');

exports.allowCrossDomain = function(req, res, next) {
    var origin = req.headers.origin || '*';

    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Set-Cookie, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // console.log('allowCrossDomain', req.method, req.url, origin);

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
    // console.log('allowCrossDomain 3');
    // var allowedHost = [
    //     'http://backbonetutorials.com',
    //     'http://localhost'
    // ];
  
    // if (allowedHost.indexOf(req.headers.origin) !== -1) {
    //     res.header('Access-Control-Allow-Credentials', true);
    //     res.header('Access-Control-Allow-Origin', req.headers.origin);
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    //     next();
    // } else {
    //     res.send({auth: false});
    // }
};
