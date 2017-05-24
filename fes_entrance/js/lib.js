//创建时间：2016年1月13日 16:09:21
//创建人：李君
//最后更新时间：2016年1月13日 16:09:24
//更新人：李君
//说明：公用函数库
/***************************************************************/
//获取url参数
function getUrlval(name) {
    var url = location.search;
    var Request = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return Request[name];
}
/*封装的ajax*/
function callService(p) {
    console.log(p);
    if (p == null || typeof(p.url) == 'undefined') {
        return;
    }
    var paras = p.paras;
    if (typeof(paras) == 'undefined') {
        paras = {};
    }
    var async = p.async? p.async:true;
    // 统一获取access_token和userid
    if(!paras.wid){
        paras.wid=oUserinfo.wid;
    }
    if(!paras.uid){
        paras.uid=oUserinfo.uid;
    }
    if(!p.unlock){//默认情况下，加载过程中将锁屏
        alert(111);
        Util.setMask("on");
    }
    $.ajax({
        url: p.url,
        type: p.type,
        data: paras,
        dataType: "json",
        async:async,
        success: function(data) {
            if(!p.unlock){
                Util.setMask("off");
            }
            if (p.callback) {
                p.callback(data);
            }
        }
    });
}
//拓展Util
var Util={};
//---------------------------
//加密函数
Util.base64_encode= function(input){
    input = Base64.strUnicode2Ansi(input);

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do{
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)){
            enc3 = enc4 = 64;
        }else if(isNaN(chr3)){
            enc4 = 64;
        }

        output = output +
            Base64.keyStr.charAt(enc1) +
            Base64.keyStr.charAt(enc2) +
            Base64.keyStr.charAt(enc3) +
            Base64.keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    }while(i < input.length);

    return output;
}
Util.locationHref=function(href){
    $("body").addClass("out");
    if(href.indexOf("?")!=-1){
        s=href+"&uid="+getUrlval("uid")+"&wid="+getUrlval("wid");
    }else{
        s=href+"?uid="+getUrlval("uid")+"&wid="+getUrlval("wid");
    }
    setTimeout(function(){
        $("body").removeClass("out");
        location.href=s;
    },500);
}
//埋点函数
Util.maiDian= function(posto, fn){
    console.log(posto.key);
    callService({
        url:"http_key_total.php",
        unlock:true,
        type:"post",
        paras:posto,
        callback:function(data){
            console.log(data);
            if(fn){
                fn();
            }
        }
    });
};
//原型拓展--------------------------------------
//去跳前后空格
String.prototype.trim=function(){
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

