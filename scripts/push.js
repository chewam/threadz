console.log('SEND PUSH');

var UA = require("urban-airship");

var ua = new UA("e9a2o-QgSpaZCwAJjxGohQ", "BBEAmaI-RZeeFTtQJyaNsg", "c6BkKs4YRsmtzbf479ti-Q");

var payload1 = {
    "aps": {
         "badge": 1,
         "alert": "Wesh Mac Ouyass!"
         // "sound": "cat.caf"
    },
    "exclude_tokens": []
};

var token = '7131031047231440065654381ef31f378ccc768839b47c1074793e8f2bb9aaa4';

ua.registerDevice(token, function(error) {
    console.log('---> AFTER REGISTER:', arguments);
    ua.pushNotification("/api/push/broadcast/", payload1, function(error) {
        console.log('---> AFTER PUSH:', arguments);
    });
});
