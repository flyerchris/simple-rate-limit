let ipRecord = {}//{ip:{time, count}}
module.exports={
    resetIp: function(ip,time){
        let t = (new Date).getTime();
        if(ipRecord[ip]){
            ipRecord[ip].time = t;
            ipRecord[ip].count = 0;
        }else{
            ipRecord[ip] = {time: t, count: 0};
        }
        return ipRecord[ip];
    },
    getIp: function(ip){
        return ipRecord[ip];
    },
    addIpCounter: function(ip,n=null){
        let ad = n || 1;
        if(ipRecord[ip]){
            ipRecord[ip].count+= ad;
        }
        return ipRecord[ip];
    },
    clean: function(){
        ipRecord = {};
    }
}