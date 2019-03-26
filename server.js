let http = require('http');
let model = {};
model.rateLimit = require('./modelRateLimit.js');
let mwRateLimit = require('./mwRateLimit.js');
let server = http.createServer(function(req, res){
    if(req.url == '/'){
        mwRateLimit(req, res, model);
        console.log("request from: "+req.connection.remoteAddress)
        res.end();
    }
});

server.listen(3141);

console.log("server run at port 3141");