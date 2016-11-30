/**
 * Created by Administrator on 2016/9/20.
 */
var request = require('request');
var Crawler = require("crawler");
var jsdom=require("jsdom");
var c=new Crawler({
    jQuery:jsdom,
    maxConnections:100,
    forceUTF8:true
});
request.post({
    url:'http://localhost:8081/crawler/user/v1/getIds',
    form:{}
},function(err,res,body){
    var body=JSON.parse(body);
    for(let i=0;i<body.data.length;i++){
        var v=body.data[i];
        !function(v){
            console.log(v);
            c.queue({
                uri:'http://www.biquku.com/0/330/'+v.num + '.html',
                callback:function(err,result,$){
                    console.log('---------------开始-------');
                    var dom=$('#content');
                    request.post({
                        url:'http://localhost:8081/crawler/user/v1/insertDesc?id='+v.id,
                        form:{detail:dom.text()}
                    })
                }
            });
        }(v);
    }
});