//创建时间：2016年1月6日 13:59:10
//创建人：李君
//最后更新时间：2016年1月6日 13:59:14
//更新人：李君
//说明：新年活动首页
var oUserinfo={
    uid:getUrlval("uid")?getUrlval("uid"):"123456",
    wid:getUrlval("wid")?getUrlval("wid"):"123456"
};
if(getUrlval("share")){
    oUserinfo.share=getUrlval("share");
}
console.log(oUserinfo);
!function($){
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
    //根据属性自动添加埋点
    $(document).on("click","[data-maidian-key]",function(){
        Util.maiDian({key:$(this).attr("data-maidian-key").trim()});
    });

    //横屏提示
    !function(){
        var str='';
        var oWin={};
        var stvCloseCvs;
        console.log(oWin);
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
                            console.log(oArc1);
                            ctx.arc(oArc1.x, oArc1.y, oArc1.r, 0, 360, false);
                            ctx.stroke();
                            ctx.closePath();
                            //圆2
                            ctx.beginPath();
                            oArc2.x-=(step+1);
                            oArc2.y+=5;
                            oArc2.r++;
                            console.log(oArc2);
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
            console.log(oWin);
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
}(jQuery);

//微信分享
!function(){
    var shareTitle="心花路放";
    var shareDesc="心花路放-微信路况";
    var appId,timestamp,nonceStr,signature;
    var urlWXShare=oVersion.addr.carpool + "/http_weixintoken.php?url="+Base64.base64_encode(window.location.href.trim());
    //ajax
    callService({
        unlock:true,
        url: urlWXShare,
        type: "post",
        paras: {},
        callback: function (data) {
            console.log(data);
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
            link: oVersion.addr.carpool+"/index.html?uid=love_chetuobang_forever_543720&wid=" + oUserinfo.wid + "&share=1",
            imgUrl: oVersion.addr.carpool+"/images/share_icon.png?v="+oVersion.v,
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
            title:shareTitle,
            link: oVersion.addr.carpool+"/index.html?uid=love_chetuobang_forever_543720&wid=" + oUserinfo.wid + "&share=1",
            imgUrl: oVersion.addr.carpool+"/images/share_icon.png?v="+oVersion.v,
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



































