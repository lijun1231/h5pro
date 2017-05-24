//创建时间：2015年12月24日 15:00:00
//创建人：李君
//最后更新时间：2015年12月24日 15:00:06
//更新人：李君
//说明：carpool
var oUserinfo={
    uid:getUrlval("uid")?getUrlval("uid"):"love_chetuobang_forever_543720",
    wid:getUrlval("wid")?getUrlval("wid"):"ctb_love",
    unid:getUrlval("unid")?getUrlval("unid"):"love_chetuobang"
};
if(getUrlval("share")){
    oUserinfo.share=getUrlval("share");
}
var catalogRoot=location.href.substring(0,location.href.lastIndexOf("/"+oVersion.name+"/")+oVersion.name.length+1);//项目目录
var cpViewpoint = document.getElementById("cpViewpoint");
var pageHash="";//hash
var carColor={//颜色
    1:"白色",
    2:"黑色",
    3:"黄色",
    4:"蓝色",
    5:"红色",
    6:"紫色",
    7:"金色",
    8:"银色",
    0:"其它"
}
var oDocinfo={};//页面信息。ch页面可见高度、st滚动条scrollTop、sh页面实际高度
$(function(){
    //公有--------------------
    //页面来源
    if(getUrlval("src")){
        var from=getUrlval("src").trim();
        Util.maiDian({key:"page_from_"+from});
    }
    responsiveScaling();
    //carpool-js
    !function(){
        //ticket-dot
        $(".ticket-dot-bottom").append("<i class='tk'></i>");
        $(".ticket-dot-top").append("<i class='tk'></i>");
        //单选
        $(".radio-itm").each(function(){
            var _this=this;
            $(this).children("input").on("change",function(){
                $(this).attr("checked","checked");
                $(_this).siblings().children("input[name="+$(this).attr("name")+"]").removeAttr("checked");
            });
        });
        //多选
        $(".checkbox-itm").each(function(){
            var _this=this;
            $(this).children("input").on("change",function(){
                if(!$(this).attr("checked")){
                    $(this).attr("checked","checked");
                }else{
                    $(this).removeAttr("checked","checked");
                }
            });
        });
        //textarea高度自动变化
        !function(){
            $("textarea.area").each(function(){
                resetHeight(this);
                this.addEventListener("input",function(){
                    resetHeight(this);
                });
            });
            function resetHeight(t){
                var h=t.scrollHeight;
                t.style.height=h+"px";
            }
        }();
        //页面信息
        oDocinfo={
            ch:document.documentElement.clientHeight,
            st:document.body.scrollTop,
            sh:document.documentElement.scrollHeight
        };
        //页面滚动
        $(window).scroll(function(){
            oDocinfo.st=document.body.scrollTop;
        });
        //城市选择
        $("[data-place]").each(function(){
            $(this).on("click",function(){
                chooseCity(parseInt(this.getAttribute("data-place")));
            });
        });
        //城市列表
        !function(){
            if(localStorage.city){
                return;
            }
            //ajax
            callService({
                url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=get_citys",
                type:"get",
                paras:{
                },
                callback:function(data){
                    if(data&&+data.ret==200&&data.data.length!=0){
                        localStorage.city=JSON.stringify(data.data);
                    }
                }
            })
        }();
        //车型选择
        $("[data-car]").each(function(){
            $(this).on("click",function(){
                chooseCar();
            });
        });
        //车型列表
        !function(){
            if(localStorage.car){
                return;
            }
            //ajax
            callService({
                url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=ajax_get_car",
                type:"get",
                paras:{
                },
                callback:function(data){
                    if(data&&+data.ret==200&&data.data.length!=0){
                        localStorage.car=JSON.stringify(data.data);
                    }
                }
            })
        }();
        //日期和时间范围选择
        !function(){
            if($("[data-date-timerange-select]").length!=0){
                $("body").append('<div id="list-date"></div>');
                $("[data-date-timerange-select]").each(function(){
                    var arr=[{
                        id:"0",
                        value:"08:00-12:00"
                    },{
                        id:"1",
                        value:"12:00-18:00"
                    },{
                        id:"2",
                        value:"18:00-23:59"
                    },{
                        id:"3",
                        value:"00:00-08:00"
                    }];
                    if($(this).attr("data-date-timerange-allday")){
                        arr.push({
                            id:"4",
                            value:"不限"
                        });
                    }
                    //日期时间选择
                    selDateTimeRange({
                        y:2016,
                        m:1,
                        d:20
                    },{
                        y:2016,
                        m:2,
                        d:22
                    },$(this),arr,false);
                });
            }
        }();
        //协议
        !function(){
            if($("[data-protocol]").length!=0){
                $("[data-protocol]").each(function(){
                    $(this).on("click",function(){
                        showProtocol($(this).attr("data-protocol"));
                    });
                });
            }
        }();
        //hash值
        !function(){
            pageHash=window.location.hash?window.location.hash.substr(1):"";
            if(pageHash){
                Util.loadByHash();
            }
            //hash值改变
            window.addEventListener("hashchange",function(){
                pageHash=window.location.hash?window.location.hash.substr(1):"";
                Util.loadByHash();
            },false);
        }();
        //根据属性自动添加埋点
        $(document).on("click","[data-maidian-key]",function(){
            Util.maiDian({key:$(this).attr("data-maidian-key").trim()});
        });
        //横屏提示
        !function(){
            var str='';
            var oWin={};
            var stvCloseCvs;
            str+='<canvas class="orienland-box-cvs" id="orienland-box-cvs"></canvas>';
            str+='<div class="orienland-box-layer" id="orienland-box-layer"></div>';
            $("body").append(str);
            var $cLayer=$("#orienland-box-layer");
            var cvs=document.getElementById("orienland-box-cvs");
            var ctx=cvs.getContext("2d");
            var oCVS;
            var oAnimationList={
                getNext:function(el){
                    var ind=oAnimationList.arrFun.indexOf(el);
                    if(ind+1<this.arrFun.length){
                        oAnimationList.arrFun[ind+1]();
                    }
                },
                arrFun:[]
            };
            oAnimationList.arrFun.push(function(){
                var self=arguments.callee;
                $(cvs).show();
                var n=50;
                var step=2*Math.PI/n;
                ctx.translate(oCVS.w/2,oCVS.h/2);
                ctx.strokeStyle="#fff";
                ctx.strokeWidth=1;
                ctx.fillStyle="#fff";
                for(var i= 0;i<=n;i++){
                    !function(i){
                        setTimeout(function(){
                            ctx.beginPath();
                            ctx.arc(0,0,30,0,step*i);
                            ctx.stroke();
                            ctx.closePath();
                            if(i>=n){
                                clearCtx();
                                oAnimationList.getNext(self);
                            }
                        },10*i);
                    }(i);
                }
            });
            oAnimationList.arrFun.push(function(){
                var self=arguments.callee;
                var grd=ctx.createRadialGradient(0,0,1,0,0,30);
                grd.addColorStop(0,"rgba(255,255,255,0)");
                grd.addColorStop(1,"rgba(255,255,255,255)");
                ctx.fillStyle=grd;
                var n=100;
                var step=15;
                var cx,cy, r;//分别代表圆心x、y、半径
                var oArc1={
                    x:0,
                    y:0,
                    r:30
                };
                var oArc2={
                    x:0,
                    y:0,
                    r:30
                };
                var _continue=true,_continue2=true,_continue3=true;
                for(var i= 0;i<=n;i++){
                    !function(i){
                        var _this=setTimeout(function(){
                            if(_continue===true) {
                                clearCtx();
                                if (i < 20) {
                                    //圆1
                                    ctx.beginPath();
                                    oArc1.x -= step;
                                    oArc1.y--;
                                    oArc1.r = 30;
                                    ctx.arc(oArc1.x, oArc1.y, oArc1.r, 0, 360, false);
                                    ctx.stroke();
                                    ctx.closePath();
                                    //圆2
                                    ctx.beginPath();
                                    oArc2.x += step;
                                    oArc2.y++;
                                    oArc2.r = 30;
                                    ctx.arc(oArc2.x, oArc2.y, oArc2.r, 0, 360, false);
                                    ctx.stroke();
                                    ctx.closePath();
                                } else if (i < 100) {
                                    //圆1
                                    ctx.beginPath();
                                    oArc1.x += step;
                                    oArc1.y += 5;
                                    oArc1.r = 30;
                                    ctx.arc(oArc1.x, oArc1.y, oArc1.r, 0, 360, false);
                                    ctx.stroke();
                                    ctx.closePath();
                                    //圆2
                                    ctx.beginPath();
                                    oArc2.x -= step;
                                    oArc2.y -= 5;
                                    oArc2.r = 30;
                                    ctx.arc(oArc2.x, oArc2.y, oArc2.r, 0, 360, false);
                                    ctx.stroke();
                                    ctx.closePath();
                                    if (oArc1.x === oArc2.x) {
                                        _continue = false;
                                    }
                                }
                            }else if(_continue2===true){
                                clearCtx();
                                //圆1
                                ctx.beginPath();
                                oArc1.x-=step;
                                oArc1.y-=5;
                                oArc1.r-=0.5;
                                ctx.arc(oArc1.x, oArc1.y, oArc1.r, 0, 360, false);
                                ctx.stroke();
                                ctx.closePath();
                                //圆2
                                ctx.beginPath();
                                oArc2.x-=(step+1);
                                oArc2.y+=5;
                                oArc2.r++;
                                ctx.arc(oArc2.x, oArc2.y, oArc2.r, 0, 360, false);
                                ctx.stroke();
                                ctx.closePath();
                                if (oArc1.y === oArc2.y) {
                                    _continue2 = false;
                                }
                            }else if(_continue3===true){
                                ctx.beginPath();
                                ctx.fillStyle="#fff";
                                ctx.font="2rem 微软雅黑";
                                ctx.fillText("横屏体验欠佳，请您竖屏使用~",oArc1.x+80,oArc1.y+10);
                                ctx.closePath();
                                _continue3=false;
                            }else{
                                if(stvCloseCvs){
                                    clearTimeout(stvCloseCvs);
                                }
                                stvCloseCvs=setTimeout(function(){
                                    $cLayer.fadeOut(200);
                                    $(cvs).hide();
                                    clearCtx();
                                },500);
                                i=n;
                                return;
                            }
                            if (i >= n) {
                                oAnimationList.getNext(self);
                            }
                        },20*i);
                    }(i);
                }
            });
            function clearCtx(){
                ctx.clearRect(-oCVS.w/2,-oCVS.h/2,oCVS.w,oCVS.h);
            }
            window.onorientationchange=function(){
                var orien=window.orientation;
                drawforOrien(orien);
            }
            drawforOrien(window.orientation);
            function drawforOrien(orien){
                oWin={
                    w:document.documentElement.clientWidth,
                    h:document.documentElement.clientHeight
                }
                $(cvs).attr("width",oWin.w<<1);
                $(cvs).attr("height",oWin.h<<1);
                $(cvs).css("width",oWin.w);
                $(cvs).css("height",oWin.h);
                oCVS={
                    w:oWin.w<<1,
                    h:oWin.h<<1
                }
                if(orien==90||orien==-90){
                    clearTimeout(stvCloseCvs);
                    $cLayer.stop().show();
                    $(cvs).show();
                    oAnimationList.arrFun[0]();
                }else{
                    $cLayer.hide();
                    $(cvs).hide();
                    clearCtx();
                }
            }
        }();
    }();
    //动态重置样式
    function setForResize(){
        //flist
        $(".flist-tit").each(function(){
            if($(this).next(".flist-sub").length!=0){
                var $sub=$(this).next();
                $sub.css("marginLeft",$(this).width());
            }else if($(this).prev(".flist-sub").length!=0){
                var $sub=$(this).prev();
                $sub.css("marginRight",$(this).width());
            }
            //宽度
        });
        //页面跳转
        $("[data-href]").each(function(){
            var href=this.getAttribute("data-href");
            this.addEventListener("click",function(){
                if($(this).attr("disabled")){
                    return;
                }
                Util.locationHref(href);
            },false);
        });
        oDocinfo.sh=document.documentElement.scrollHeight;
    }
    //根据页面执行函数
    !function(){
        var rp=cpViewpoint.getAttribute("data-page");//页面响应式标识
        if(!localStorage.identifytype&&rp!="index"){
            Util.locationHref("index.html");
        }
        //页面响应式监听
        $(window).resize(function(){
            setForResize();//动态重置样式
            if(oListenRp[rp]){
                oListenRp[rp]();
            }
        });
        $(window).trigger("resize");
        //页面执行脚本
        if(oScriptPg[rp]){
            oScriptPg[rp]();
        }
    }();
});
var oListenRp={
    index:function(){
        //-------------------
        var $lstPic=$(".responsive-pic");
        var r=$lstPic.width();
        $lstPic.height(r);
    },
    trip_psr:function(){
        //-------------------
        var $lstPic=$(".responsive-pic");
        var r=$lstPic.width();
        $lstPic.height(r);
        $(".disable").each(function(){
            var $con=$(this).find(".trip-list-sub-con");
            var $asd=$(this).find(".buttons-box");
            $con.find("span").addClass("cl-grey");
            $con.find(".h2").removeClass("cl-org").addClass("cl-grey");
            $con.find(".trip-list-sub-con-aside").removeClass("cl-green").addClass("cl-org");
            $asd.find("button:first").removeClass("bt-red").addClass("bt-grey");
        });
        $(".flist").children("li:last").addClass("hasborder");
    },
    trip_owner:function(){
        $(".disable").each(function(){
            var $con=$(this).find(".trip-list-sub-con");
            var $asd=$(this).find(".buttons-box");
            $con.find("span").addClass("cl-grey");
            $con.find(".h2").removeClass("cl-org").addClass("cl-grey");
            $con.find(".trip-list-sub-con-aside").removeClass("cl-green").addClass("cl-org");
            $asd.find("button:first").removeClass("bt-red").addClass("bt-grey");
        });
        $(".flist").children("li:last").addClass("hasborder");
    },
    tripde:function(){
        $(".resp-list-item").each(function(){
            var $lb=$(this).children("label");
            $(this).css("minHeight",$lb.height());
        });
    }
}
var oScriptPg={
    index:function(){
        //-------------------
        //我的行程
        var d_tar=document.getElementById("to-trip")
        touch.on(d_tar, 'touchstart', function(ev){
            //ev.preventDefault();
        });
        var dx, dy;
        touch.on(d_tar, 'drag', function(ev){
            dx = dx || 0;
            dy = dy || 0;
            var offx = dx + ev.x;
            var offy = dy + ev.y;
            d_tar.style.webkitTransform = "translate3d(" + offx + "px," + offy + "px,0)";
        });

        touch.on(d_tar, 'dragend', function(ev){
            dx += ev.x;
            dy += ev.y;
        });
    },
    trip_psr:function(){
    },
    trip_owner:function(){
    },
    trip_order:function(){
        $(".disable").each(function(){
            var $con=$(this).find(".order-list-sub-con");
            $con.find(".order-list-sub-con-bt").removeClass("bt-red").addClass("bt-disable");
        });
        $(".flist").children("li:last").addClass("hasborder");
    }
}
/***************************************/

//选择城市
function chooseCity(type){
    var ev=window.event||arguments.callee.arguments[0].caller;
    var target=ev.target||ev.srcElement;
    if(!$("#model-pop-city").length){
        $("body").append('<div class="model-pop city-box" id="model-pop-city"></div>');
        $("#model-pop-city").load("city.html",function(){
            //弹框-地址选择
            $(function(){
                $("#model-pop-city").bottomUp({
                    autoOpen: true,
                    scale: false,
                    layer: true,
                    closeBt:true,
                    layerClose:true
                });
            });
            setCityList({
                tar:target,
                grade:"province",
                type:type,
                str:""
            });
        });
    }else{
        $("#model-pop-city").bottomUp("open");
        setCityList({
            tar:target,
            grade:"province",
            type:type,
            str:""
        });
    }
}
//设置城市
function setCityList(o){
    var $list=$("#city-box-con");
    $list.empty();
    switch(o.grade){
        case "province":
            //设置标题
            $("#city-box-tit").text("选择省份");
            //填充数据
            var arr=JSON.parse(localStorage.city);
            for(var i= 0,len=arr.length;i<len;i++){
                $list.append('<li class="wrap city-box-con-itm" data-provinceid="'+arr[i].id+'">'+arr[i].province+'</li>');
            }
            //选择
            $list.children("li").off("click");
            $list.children("li").each(function() {
                $(this).on("click",function () {
                    o.tar.setAttribute("data-provinceid",textTrim(this.getAttribute("data-provinceid")));
                    o.tar.removeAttribute("data-cityid");
                    o.tar.removeAttribute("data-citytxt");
                    o.tar.removeAttribute("data-areaid");
                    setCityList({
                        tar: o.tar,
                        grade: "city",
                        type: o.type,
                        str: o.str + $(this).text(),
                        provinceid: $(this).attr("data-provinceid")
                    });
                });
            });
            break;
        case "city":
            //设置标题
            $("#city-box-tit").text("选择城市");
            //填充数据
            var arr=JSON.parse(localStorage.city);
            for(var i= 0,len=arr.length;i<len;i++){
                if(arr[i].id== o.provinceid){
                    if(!isNotEmpty(arr[i].country)){
                        return;
                    }
                    arr=arr[i].country;
                    for(var i= 0,len=arr.length;i<len;i++){
                        $list.append('<li class="wrap city-box-con-itm" data-cityid="'+arr[i].id+'">'+arr[i].city+'</li>');
                    }
                    break;
                }
            }
            //选择
            $list.children("li").off("click");
            $list.children("li").each(function() {
                $(this).on("click",function () {
                    o.tar.setAttribute("data-cityid",textTrim(this.getAttribute("data-cityid")));
                    o.tar.setAttribute("data-citytxt",textTrim(this.innerHTML));
                    o.tar.removeAttribute("data-areaid");
                    if(o.type==3){
                        setCityList({
                            tar: o.tar,
                            grade: "area",
                            type: o.type,
                            str: o.str + $(this).text(),
                            provinceid: o.provinceid,
                            cityid: $(this).attr("data-cityid")
                        });
                    }else if(o.type===2){
                        $("#model-pop-city").bottomUp("close");
                        o.tar.setAttribute("value",textTrim(o.str + $(this).text()));
                    }
                });
            });
            break;
        case "area":
            //设置标题
            $("#city-box-tit").text("选择区县");
            //填充数据
            var arr=JSON.parse(localStorage.city);
            for(var i= 0,len=arr.length;i<len;i++){
                if(arr[i].id== o.provinceid){
                    arr=arr[i].country;
                    for(var i= 0,len=arr.length;i<len;i++){
                        if(arr[i].id== o.cityid) {
                            if(!isNotEmpty(arr[i].country)){
                                return;
                            }
                            arr=arr[i].country;
                            for(var i= 0,len=arr.length;i<len;i++){
                                $list.append('<li class="wrap city-box-con-itm" data-areaid="'+arr[i].id+'">'+arr[i].area+'</li>');
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            //选择
            $list.children("li").off("click");
            $list.children("li").each(function() {
                $(this).on("click",function () {
                    o.tar.setAttribute("data-areaid",textTrim(this.getAttribute("data-areaid")));
                    $("#model-pop-city").bottomUp("close");
                    o.tar.setAttribute("value",textTrim(o.str + $(this).text()));
                });
            });
            break;
    }
    function isNotEmpty(arr){
        if(!arr||arr.length==0){
            $("#model-pop-city").bottomUp("close");
            o.tar.setAttribute("value",textTrim(o.str));
            return false;
        }else{
            return true;
        }
    }
}
//选择车型
function chooseCar(){
    var ev=window.event||arguments.callee.arguments[0].caller;
    var target=ev.target||ev.srcElement;
    if(!$("#car-brand-box").length){
        $("body").append('<div id="car-brand-box"></div>');
        $("#car-brand-box").load("car.html",function(){
            setCarList({
                grade:"brand",
                tar:target
            });
        });
    }else{
        setCarList({
            grade:"brand",
            tar:target
        });
    }
}
function setCarList(o){
    switch(o.grade){
        case "brand":
            //数据填充
            var arr=JSON.parse(localStorage.car);
            var $list=$("#car-brand");
            $list.empty();
            $list.show();
            for(var i= 0,len=arr.length;i<len;i++){
                if(i==0||arr[i].code!=arr[i-1].code){
                    $list.append("<p>"+arr[i].code+"</p>");
                }
                $list.append("<li data-brandid='"+arr[i].id+"' code='"+arr[i].code+"'><img src='"+arr[i].pic+"'>"+arr[i].name+"</li>");
            }
            //绑定事件
            $list.children("li").each(function(){
                $(this).on("click",function(){
                    o.tar.setAttribute("data-brandid",$(this).attr("data-brandid"));
                    o.tar.removeAttribute("data-typeid");
                    setCarList({
                        grade:"type",
                        tar: o.tar,
                        str:textTrim($(this).text()),
                        brandid:$(this).attr("data-brandid")
                    });
                });
            });
            break;
        case "type":
            //数据填充
            var arr=JSON.parse(localStorage.car);
            var $listType=$("#car-type");
            $listType.empty();
            $listType.show();
            for(var i= 0,len=arr.length;i<len;i++){
                if(arr[i].id== o.brandid){
                    var sub=arr[i].sub;
                    for(var i= 0,lens=sub.length;i<lens;i++){
                        if(!sub[i].sub||sub[i].sub.length==0){
                            o.tar.setAttribute("value",o.str);
                            //$("#car-type").empty().hide();
                            //$("#car-brand").empty().hide();
                            //return;
                            var subs=sub;
                        }else{
                            $listType.append("<p>"+sub[i].name+"</p>");
                            var subs=sub[i].sub;
                        }

                        for(var j= 0,lensi=subs.length;j<lensi;j++){
                            $listType.append("<li data-typeid='"+subs[j].id+"' code='"+subs[j].code+"'><img src='"+subs[j].pic+"'>"+subs[j].name+"</li>");
                        }
                    }
                    break;
                }
            }
            //绑定事件
            $listType.children("li").off("click");
            $listType.children("li").each(function(){
                $(this).on("click",function(){
                    o.tar.setAttribute("data-typeid",$(this).attr("data-typeid"));
                    o.tar.setAttribute("value",o.str+textTrim($(this).text()));
                    $("#car-type").empty().hide();
                    $("#car-brand").empty().hide();
                });
            });
            break;
    }
}
//非空检测
function isFormatedForNull(){
    var $fnull=$("[data-format-null]");
    for(var i= 0,len=$fnull.length;i<len;i++){
        var $this=$fnull.eq(i);
        if($this.val().trim()==""){
            ErrorAlert($this.attr("data-format-null"));
            return false;
        }
    }
    return true;
}
//协议
function showProtocol(type){
    var pageName;
    switch(type){
        case "carpool":
            pageName="protocol.html";
            break;
        case "insurance":
            pageName="protocol_insurance.html";
            break;
        case "insurance2":
            pageName="protocol_insurance2.html";
            break;
        case "insurance3":
            pageName="protocol_insurance3.html";
            break;
    }
    $("body").append('<div class="model-pop protocol-box" id="model-pop-protocol"></div>');
    $("#model-pop-protocol").load(pageName,function(){
        //弹框-地址选择
        $(function(){
            $("#model-pop-protocol").bottomUp({
                autoOpen: true,
                scale: false,
                layer: true,
                closeBt:true,
                layerClose:true
            });
        });
    });
}
//页面缩放
function responsiveScaling(){
    var DeviceWidth = window.screen.availWidth;//先获取设备可用宽度
    var standardWidth = 375;//iPhone6/6S作为标准尺寸
    var scaling = (DeviceWidth/standardWidth).toFixed(5);
    var viewpointVal = "width=device-width,inital-scale="+scaling+",maximum-scale="+scaling+",user-scalable=no,minimal-ui;";
    cpViewpoint.setAttribute('content',viewpointVal);
}

//微信分享
!function(){
    var shareTitle="好人好车好风景";
    var shareDesc="一起拼搏异乡，一起拼车回家！";
    var appId,timestamp,nonceStr,signature;
    var urlWXShare="http_weixintoken.php?url="+Base64.base64_encode(window.location.href.trim());
    //ajax
    callService({
        unlock:true,
        url: urlWXShare,
        type: "post",
        paras: {},
        callback: function (data) {
            if (data) {
                appId = data.appId;
                timestamp = data.timestamp;
                nonceStr = data.nonceStr;
                signature = data.signature;
                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                });
            }
        }
    });
    function onWeiXinReady(){
        //分享给朋友
        wx.onMenuShareAppMessage({
            title:shareTitle,
            desc: shareDesc,
            //link: catalogRoot+"/index.html?uid=love_chetuobang_forever_543720&wid=" + oUserinfo.wid + "&share=1&from=friend",
            link:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8673c3466f721c36&redirect_uri=http%3A%2F%2Fweixin.chetuobang.com%2Fweilukuang%2Findex.php%3Fc%3Dweixin_call_back%26m%3Dget_code%26wid%3Dgh_cd7aba9ea147&response_type=code&scope=snsapi_base&state=carpool_share#wechat_redirect",
            imgUrl: catalogRoot+"/images/share_icon.png?v="+oVersion.v,
            type: 'link',
            dataUrl: '',
            success: function(){
                //Util.maiDian({"uid": oUserinfo.uid, "wid": oUserinfo.wid, "key": "weixine_dog_adshare_friend"});
            },
            cancel: function(){
            }
        });
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title:shareDesc,
            //link: catalogRoot+"/index.html?uid=love_chetuobang_forever_543720&wid=" + oUserinfo.wid + "&share=1&from=circle",
            link:"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8673c3466f721c36&redirect_uri=http%3A%2F%2Fweixin.chetuobang.com%2Fweilukuang%2Findex.php%3Fc%3Dweixin_call_back%26m%3Dget_code%26wid%3Dgh_cd7aba9ea147&response_type=code&scope=snsapi_base&state=carpool_share#wechat_redirect",
            imgUrl: catalogRoot+"/images/share_icon.png?v="+oVersion.v,
            success: function () {
                //Util.maiDian({"uid": oUserinfo.uid, "wid": oUserinfo.wid, "key": "weixine_dog_adshare_circle"});
            },
            cancel: function () {
            }
        });
    }
    wx.ready(onWeiXinReady);

    wx.error(function(res){
    });
}();

























