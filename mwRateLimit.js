module.exports = function(req, res, model){
    let ip = req.connection.remoteAddress;
    let ipRecord = model.rateLimit.getIp(ip);
    let now = (new Date()).getTime();
    if(now-ipRecord.time > 10000){
        model.rateLimit.resetIp(ip)
    }
    model.rateLimit.addIpCounter(ip);
    console.log(ipRecord);
    if(ipRecord.count > model.rateLimit.limit){
        res.write("error");
        return;
    }
    res.write("request "+ipRecord.count);
}