let modelRateLimit = require("./modelRateLimit.js");
let mwRateLimit = require("./mwRateLimit.js");
let req = {}, res={};
function initData(){
    req = {
        connection:{
            remoteAddress: "127.0.0.1"
        }
    };
    res = {
        write:  function(w){
            this._write = w;
        }
    }
    modelRateLimit.clean();
}

(function(){
    console.log("測試 modelRateLimit");
    (function(){
        initData();
        console.log("\t測試getIp...");
        process.stdout.write("\t\t沒有紀錄要return null...");
        if(!modelRateLimit.getIp(req.connection.remoteAddress)){
            console.log("OK");
        }else{
            console.log("failed");
        }

        process.stdout.write("\t\t有紀錄...");
        modelRateLimit.resetIp(req.connection.remoteAddress);
        if(modelRateLimit.getIp(req.connection.remoteAddress)){
            console.log("OK");
        }else{
            console.log("failed");
        }
    })();

    (function(){
        initData();
        console.log("\t測試resetIp...");
        process.stdout.write("\t\t寫入紀錄...");
        modelRateLimit.resetIp(req.connection.remoteAddress);
        if(modelRateLimit.getIp(req.connection.remoteAddress)){
            console.log("OK");
        }else{
            console.log("failed");
        }

        process.stdout.write("\t\t紀錄歸0...");
        modelRateLimit.addIpCounter(req.connection.remoteAddress);
        modelRateLimit.resetIp(req.connection.remoteAddress);
        if(modelRateLimit.getIp(req.connection.remoteAddress).count==0){
            console.log("OK");
        }else{
            console.log("failed");
        }
    })();

    (function(){
        initData();
        console.log("\t測試 addIpCounter...");
        process.stdout.write("\t\t沒記錄回傳null...");
        if(!modelRateLimit.addIpCounter("1.1.1.1")){
            console.log("OK");
        }else{
            console.log("failed");
        }
        
        process.stdout.write("\t\t紀錄的 count 會增加...");
        modelRateLimit.resetIp(req.connection.remoteAddress);
        let ir = modelRateLimit.addIpCounter(req.connection.remoteAddress);
        if(ir.count==1){
            console.log("OK");
        }else{
            console.log("failed");
        }
    })();
})();

(function(){
    console.log("測試 mwRateLimit");
    (function(){
        initData();
        process.stdout.write("\t正常紀錄30秒內30次造訪...");
        for(let i=1;i<=30;i++){
            mwRateLimit(req,res,{rateLimit:modelRateLimit});
            if(res._write!="request "+i){
                console.log("造訪錯誤",i);
                break;
            }
        }
        process.stdout.write("\n\t第31次造訪要顯示error...");
        mwRateLimit(req,res,{rateLimit:modelRateLimit});
        if(res._write!="error"){
            console.log("阻擋錯誤");
        }
    })();
})();