let requestLimit = 30;//請求次數上限
let durition = 30000;//ms
module.exports = function(req, res, model){
    let ip = req.connection.remoteAddress;
    let ipRecord = model.rateLimit.getIp(ip) || model.rateLimit.resetIp(ip);
    let now = (new Date()).getTime();
    if(now-ipRecord.time > durition){
        model.rateLimit.resetIp(ip)
    }
    model.rateLimit.addIpCounter(ip);
    console.log(ipRecord);
    if(ipRecord.count > requestLimit){
        res.write("error");
        return;
    }
    res.write("request "+ipRecord.count);
}