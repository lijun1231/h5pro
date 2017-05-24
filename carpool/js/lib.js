//创建时间：2015年12月24日 15:05:04
//创建人：李君
//最后更新时间：2015年12月24日 15:07:41
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
/*判断字符串是不是邮箱*/
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return reg.test(str);
}
/*获取cookie*/
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
/*设置cookie*/
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}
//删除cookies
function clearCookie(name) {
    setCookie(name, "", -1);
}
//验证座机
function checkPhone(sPhone) {
    if ((/^(\d{3,4}\-)?\d{7,8}$/i.test(sPhone))) { //座机格式010-98909899
        return true;
    } else if ((/^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/.test(sPhone))) { //座机格式01098909899
        return true;
    } else if ((/^(400)\d{7}$/.test(sPhone))) { //座机格式4000000000
        return true;
    } else {
        return false;
    }
}
//验证手机
function checkMobile(sMobile) {
    if (!(/^1[3|4|5|8|7][0-9]\d{8}$/.test(sMobile))) {
        return false;
    } else {
        return true;
    }
}
//验证身份证号
function checkIDCard(sCard) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(sCard) === false){
        return  false;
    }else{
        return true;
    }
}
//验证姓名
function checkName(s,notChargeLen) {
    if(notChargeLen){
        var reg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
    }else{
        var reg = /^([\u4e00-\u9fa5]{2,}|([a-zA-Z]+\s?){2,})$/;
    }
    if(reg.test(s) === false){
        return  false;
    }else{
        return true;
    }
}
//验证车牌号
function checkCarPlate(s) {
    var reg = /(^[a-zA-Z]{1}(\d|[a-zA-Z]){5}$)/;
    if(reg.test(s) === false){
        return  false;
    }else{
        return true;
    }
}
//添加顶部提示
$(function(){
    var str="<div id='Prompt' class='Prompt'></div>";
    $("body").append(str);
});
//红色错误顶部提示
var stvAlert;
function ErrorAlert(msg) {
    $("#Prompt").empty();
    $("#Prompt").html("<div class=\"prompt PromptError\">" + msg + "</div>");
    $("#Prompt").slideDown();
    if(stvAlert){
        clearTimeout(stvAlert);
    }
    stvAlert=setTimeout(function() {
        $("#Prompt").hide().slideUp();
    }, 3000);
}
//绿色正确顶部提示
function SuccessAlert(msg) {
    $("#Prompt").empty();
    $("#Prompt").html("<div class=\"prompt PromptSuccess\">" + msg + "</div>");
    $("#Prompt").slideDown();
    if(stvAlert){
        clearTimeout(stvAlert);
    }
    stvAlert=setTimeout(function() {
        $("#Prompt").hide().slideUp();
    }, 3000);
}
//黄色警告顶部提示
function WarnAlert(msg) {
    $("#Prompt").empty();
    $("#Prompt").html("<div class=\"prompt PromptWarn\">" + msg + "</div>");
    $("#Prompt").hide().slideDown();
    if(stvAlert){
        clearTimeout(stvAlert);
    }
    stvAlert=setTimeout(function() {
        $("#Prompt").hide().slideUp();
    }, 3000);
}
//添加选择框
$(function(){
    var str="<div id='SelectPompt' class='SelectPompt'><ul></ul></div><div id='SelectLayer' class='SelectLayer'></div>";
    $("body").append(str);
    $("#SelectLayer").on("click",function(){
        $(this).fadeOut(300);
        $("#SelectPompt").fadeOut(300);
    });
});
//选择框
function SelectAlert(arr,callback,sty){
    var $p=$("#SelectPompt");
    var $list=$p.children("ul");
    var $layer=$("#SelectLayer");
    $list.empty();
    for(var i= 0,len=arr.length;i<len;i++){
        $list.append('<li data-id="'+arr[i].id+'">'+arr[i].value+'</li>');
    }
    if(sty){
        $list.children().each(function(){
            $(this).css(sty);
        });
    }
    $p.show();
    $layer.show();
    $list.children().on("click",function(){
        var ind=$(this).index();
        if(callback){
            callback({id:arr[ind].id,value:arr[ind].value});
        }
        if(arr[ind].callback){
            arr[ind].callback();
        }
        $p.hide();
        $layer.hide();
        $list.empty();
    });
}
//去除前后空格
function textTrim(txt) {
    if(typeof txt=="string"){
        return txt.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }else{
        for(i in txt){
            if(txt[i]&&(typeof txt[i]=="string")){
                txt[i]=txt[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }else{
                txt[i]="";
            }
        }
        return txt;
    }
}
/*封装的ajax*/
function callService(p) {
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

//获取元素绝对位置Left
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
//获取元素绝对位置Top
function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
//是否在页面底部
function isPageEnd(){
    if(oDocinfo.st+oDocinfo.ch+1>oDocinfo.sh){
        return true;
    }
    return false;
}
//选择日期和时间范围
function selDateTimeRange(dStart,dEnd,tar,arr,notToday){
    var $date=tar;
    var $listDate=$("#list-date");
    //var $listTime=$("#list-timerange");
    var dt=new Date();
    var y=dt.getFullYear();
    var m=dt.getMonth();
    var d=dt.getDate();
    var todayStamp=new Date().getTime();
    var startStamp=new Date(dStart.y,dStart.m-1,dStart.d).getTime();
    if(todayStamp>startStamp){
        minValue=new Date(y,m,d);
    }else{
        minValue=new Date(dStart.y,dStart.m-1,dStart.d);
    }
    //日期
    $listDate.mobiscroll().date({
        theme: 'mobiscroll',
        lang:"zh",
        display: 'modal',
        defaultValue: minValue,
        dateFormat: 'yyyy-mm-dd',
        minDate: minValue,
        maxDate: new Date(dEnd.y,dEnd.m-1,dEnd.d),
        onSelect:function(data){
            $date.attr("data-date",data).val(data);
            $date.removeAttr("data-timestart");
            $date.removeAttr("data-timeend");
            SelectAlert(arr,function(data){
                if(data.value.indexOf("-")==-1){
                    ts="";
                    td="";
                }else{
                    var ts=data.value.substring(0,data.value.indexOf("-"));
                    var td=data.value.substr(data.value.indexOf("-")+1);
                }
                if(ts==""&&td==""){
                    $date.attr("data-timestart",ts).attr("data-timeend",td).val($date.val()+" 全天");
                }else{
                    $date.attr("data-timestart",ts).attr("data-timeend",td).val($date.val()+" "+ts+"-"+td);
                }
            },{"fontSize":"1.2em","fontFamily":"微软雅黑"});
        }
    });
    $date.click(function(){
        $listDate.mobiscroll('show');
        return false;
    });
}
//拓展Util
var Util={};
//---------------------------
Util.getRectBoxObj=function(element){
    /*box.getBoundingClientRect().top // 元素上边距离页面上边的距离
     box.getBoundingClientRect().right // 元素右边距离页面左边的距离
     box.getBoundingClientRect().bottom // 元素下边距离页面上边的距离
     box.getBoundingClientRect().left // 元素左边距离页面左边的距离
     */
    var box = element.getBoundingClientRect();
    var top = box.top;         // 元素上边距离页面上边的距离
    var right = box.right;       // 元素右边距离页面左边的距离
    var bottom = box.bottom;      // 元素下边距离页面上边的距离
    var left = box.left;        // 元素左边距离页面左边的距离
    var width = box.width || right - left;     //元素自身的宽度
    var height = box.height || bottom - top;     //元素自身的高度
    return {'top': top, 'left': left, 'right': right, 'bottom': bottom, 'width': width, 'height': height};
};
Util.loadByHash=function(){
    switch(pageHash){
        case "":
            break;
        default:
    }
}
Util.changeHash=function(resource){//hash值改变
    window.location.hash = resource;
}
Util.locationHref=function(href){
    $("body").addClass("out");
    if(href.indexOf("?")!=-1){
        s=href+"&uid="+oUserinfo.uid+"&wid="+oUserinfo.wid+"&unid="+oUserinfo.unid;
    }else{
        s=href+"?uid="+oUserinfo.uid+"&wid="+oUserinfo.wid+"&unid="+oUserinfo.unid;
    }
    if(oUserinfo.share){
        s+="&share="+oUserinfo.share;
    }
    setTimeout(function(){
        $("body").removeClass("out");
        location.href=s;
    },500);
}
Util.setMask=function(t){
    if(t=="on"){
        if($("#loading-layer").length==0){
            var str='';
            str+='<div id="loading-layer" class="loading-layer">';
            str+='<div class="loading-con">';
            str+='<div class="loading-item" id="object_one"></div>';
            str+='<div class="loading-item" id="object_two"></div>';
            str+='<div class="loading-item" id="object_three"></div>';
            str+='<div class="loading-item" id="object_four"></div>';
            str+='</div>';
            str+='</div>';
            $("body").append(str);
        }
        $("#loading-layer").show();
    }else if("off"){
        $("#loading-layer").hide();
    }
}
Util.clearForm=function(){
    $(':input').not(':button, :submit, :reset, :hidden,[readonly]').val('').removeAttr('checked').removeAttr('selected');
}
Util.uuid= function(){
    var len=arguments.length?arguments[0]:16;
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*len|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(len);
    });
}
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
//埋点函数
Util.maiDian= function(posto, fn){
    callService({
        url:"http_key_total.php",
        unlock:true,
        type:"post",
        paras:posto,
        callback:function(data){
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
//返回某个元素在数组中的索引值的
Array.prototype.indexOf = function(el){
    for (var i=0,n=this.length; i<n; i++){
        if (this[i] === el){
            return i;
        }
    }
    return -1;
}

