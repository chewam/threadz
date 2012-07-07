console.log('SEND PUSH');

var UA = require("urban-airship");

var ua = new UA("e9a2o-QgSpaZCwAJjxGohQ", "BBEAmaI-RZeeFTtQJyaNsg", "c6BkKs4YRsmtzbf479ti-Q");

// var payload1 = {
//     "aps": {
//          "badge": 1,
//          "alert": "Wesh Mac Ouyass!"
//          // "sound": "cat.caf"
//     },
//     "exclude_tokens": []
// };

// var token = '7131031047231440065654381ef31f378ccc768839b47c1074793e8f2bb9aaa4';
// var token = '3e2d5f4648cdb88a1ed8c5eeb0b86cba041b1331452f248f517f5f7f0a6c27e1';

// ua.registerDevice(token, function(error) {
//     console.log('---> AFTER REGISTER:', arguments);
//     ua.pushNotification("/api/push/broadcast/", payload1, function(error) {
//         console.log('---> AFTER PUSH:', arguments);
//     });
// });

var payload0 = {
    "device_tokens": [
        '3e2d5f4648cdb88a1ed8c5eeb0b86cba041b1331452f248f517f5f7f0a6c27e1', // iPad
        '7131031047231440065654381ef31f378ccc768839b47c1074793e8f2bb9aaa4' // iPhone
    ],
    "aps": {
        "alert": "Simple push",
        "badge": 42
    }
};

ua.pushNotification("/api/push", payload0, function(error) {
    console.log('---> AFTER PUSH:', arguments);
});
