module.exports={
    ipRecord:{},//{ip:{time, count}}
    resetIp: function(ip,time){
        let t = (new Date).getTime();
        if(this.ipRecord[ip]){
            this.ipRecord[ip].time = t;
            this.ipRecord[ip].count = 0;
        }else{
            this.ipRecord[ip] = {time: t, count: 0};
        }
        return this.ipRecord[ip];
    },
    getIp: function(ip){
        return this.ipRecord[ip];
    },
    addIpCounter: function(ip,n=null){
        let ad = n || 1;
        if(this.ipRecord[ip]){
            this.ipRecord[ip].count+= ad;
        }
        return this.ipRecord[ip];
    }
}