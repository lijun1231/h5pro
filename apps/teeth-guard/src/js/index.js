//创建时间：2016年4月26日 15:38:34
//创建人：李君
//说明：入口
var oUserinfo;
var oDocinfo={};
var j_m;
var catalogRoot;//项目目录
var shareTitle="宝宝牙康 | 关注宝宝牙齿健康！";
var shareDesc="宝宝牙康 | 关注宝宝牙齿健康 每天都要来哦！";
var __paras__={};//公用变量对象
//Util.setCookie("secret","5b5912180a48d6f50bd0ba620e04cd61458ad1cee22c799758f079659372b1054ca59f3c0c6c6f27ae97371d4eda7678a0b28c4a5ad0477bed0679d5ee276fae");
Util.setCookie("secret",Util.getUrlval("secret")||"fb6e8db96d03aaa7f06e4d93640997e9a57ec495d339084a1707e02ede4aa9c68966657a740732db85cae873aca214f637f06fbaa4378381994df2c21c5d3e88");
!function(){
    //-------------------------
    //return;
    //oUserinfo
    oUserinfo={
        wid:Util.getUrlval("wid")||null,
        openid:Util.getUrlval("openid")||null,
        uid:Util.getUrlval("uid")||null,
        unid:Util.getUrlval("unid")||null,
        from:Util.getUrlval("from")||null,
        secret:Util.getCookie("secret"),
        test:Util.getUrlval('test')||null,//如果有test值，则不会进行埋点
        addr:{//公用addr
            'root':"http://www.sooneus.tv",
            'interface':"http://bbyk.mudeedee.com/g/d.php",
            'wx_callback':"",
            'file':""
        }
    };
    //页面信息
    oDocinfo={
        ch:document.documentElement.clientHeight,
        st:document.body.scrollTop,
        sh:document.documentElement.scrollHeight
    };
    //页面滚动
    // $(window).scroll(function(){
    //     oDocinfo.st=document.body.scrollTop;
    // });
    //初始化框架
    j_m=new Junb({
        test:oUserinfo.test,
        beforeShow:function(t){},
        afterShow:function(t){}
    });
    catalogRoot=location.href.substring(0,location.href.lastIndexOf("/"+j_m.oVersion.name+"/")+j_m.oVersion.name.length+1);//项目目录
    //-------------------------
    //pub
    !function(){
        //根据属性自动添加埋点
        // $(document).on("click","[data-maidian-key]",function(){
        //     Util.maiDian({key:$(this).attr("data-maidian-key").trim()});
        // });
        //页面滚动
        // $(window).scroll(function(){
        //     oDocinfo.t=document.body.scrollTop||document.documentElement.scrollTop;
        // });
        // if(window.orientation===0){
        //     $("body").height($(window).height());
        // }
        //视频列表点击进详情
        // $(document).on("click",".eye-list>ul>li>img",function(){
        //     var $itm=$(this).parent();
        //     j_m.changeHash("detail/video_id="+$itm.attr("data-id"));
        // });
        Util.clearAllCookies();
        //Util.landscapeTip(true);//横屏提示
        //wxSdkApply();//微信sdk
        Util.responsiveScaling();
        //获取用户信息
        // setUserinfo();
        //个人中心的打开和关闭
        //!function(){
        //    var $bt=$('#j-footer-to');
        //    setTimeout(function(){
        //        if(j_m.cateHash['usr']){
        //            $bt.attr('data-href','\-usr');
        //            $bt.addClass('on');
        //        }
        //    });
        //    $bt.click(function(e){
        //        if($(this).hasClass('on')){
        //            $(this).attr('data-href','\-usr');
        //            $(this).removeClass('on');
        //        }else{
        //            $(this).attr('data-href','\^usr=u');
        //            $(this).addClass('on');
        //        }
        //        //e.stopPropagation();
        //    });
        //}();
    }();
    //-------------------------
    //access
    !function(){
        j_m.extend({
            id:'main',
            title:'宝宝牙康',
            init:function(t){
                console.log('init');
            },
            beforeShow:function(t){
                console.log('beforeShow');
            },
            afterShow:function(cc,t){
                var page = t[0];
                // console.log($page);
                console.log('afterShow');
                cc();//页面渲染
            },
            beforeHide:function(t){
                console.log('beforeHide');
            },
            afterHide:function(t){
                console.log('afterHide');
            },
            unload:function(t){
                console.log('unload');
            },
            res:{
                style:['css/main.css'],
                // js:[['js/main_ini.js'],'js/main.js']
                js:['js/main.js']
            }
        });
        j_m.extend("list",'搜索结果',function(cc,t){
            // var $page=$(t[0]);cc();
        },{
            js:['js/list.js']
        });

        //-------------------------
        j_m.extendBeforeRender(function(){
            //检验用户中心模板
            !function(){
                if (j_m.temps.hasOwnProperty('usr')) {
                    if(j_m.cateHash.usr){
                        j_m.temps['usr'].show();
                    }else{
                        j_m.temps['usr'].hide();
                    }
                }
            }();
        });
        //公共渲染——渲染前
        j_m.extendBeforeShow(function(t){
            // var $page=$(t[0]);//当前页面
            // $page.find("*").off("click touchstart touchend touchmove scroll focus blur change select load keydown resize");
            if(j_m.device.plat==="android"){
                wxSdkApply();//微信sdk
            }
        });
        //-------------------------
        //公有渲染——渲染后
        j_m.extendAfterShow(function(t){
            var page=t[0];//当前页面
        });
        j_m.iniPages();
    }();
}();
//微信分享
function wxSdkApply(){
    try{
        var appId,timestamp,nonceStr,signature;
        var urlWXShare="http_weixintoken.php?url="+Base64.base64_encode(window.location.href.trim());
        //var shareURL=location.href.split("?")[0]+"?openid="+oUserinfo.openid+"&uid="+oUserinfo.uid+"&wid="+oUserinfo.wid+"#login";//分享链接
        var shareURL=location.href.split("?")[0]+"?#login";//分享链接
        //ajax
        Util.callService({
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
            wx.hideOptionMenu();
            //wx.hideMenuItems({
            //    menuList: [
            //        'menuItem:readMode', // 阅读模式
            //        'menuItem:share:timeline', // 分享到朋友圈
            //        'menuItem:copyUrl' // 复制链接
            //    ],
            //    success: function (res) {
            //        alert('已隐藏 阅读模式 分享到朋友圈 复制链接 等按钮');
            //    },
            //    fail: function (res) {
            //        alert(JSON.stringify(res));
            //    }
            //});
            //分享给朋友
            return;
            wx.onMenuShareAppMessage({
                title:shareTitle,
                desc: shareDesc,
                link:shareURL,
                imgUrl: catalogRoot+"/images/share_icon.png?v="+j_m.oVersion.v,
                type: 'link',
                dataUrl: '',
                success: function(){
                },
                cancel: function(){
                }
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title:shareDesc,
                link:shareURL,
                imgUrl: catalogRoot+"/images/share_icon.png?v="+j_m.oVersion.v,
                success: function () {
                },
                cancel: function () {
                }
            });
        }
        wx.ready(onWeiXinReady);

        wx.error(function(res){
        });
    }catch(e){}
}


//获取当前城市
function getCurrCity(fn){
    //实例化城市查询类
    AMap.service(["AMap.CitySearch"], function() { //加载地理编码
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
            if (result && result.city && result.bounds) {
                fn(result);
            }
        });
    });
}
//输入文字
function replyText(o){
    var $page=$(j_m.currPage[0]);
    var $rep=$page.children(".comm-ret");
    if(typeof o==="string"&&o==="close"){
        $rep.remove();
        return;
    }else if(typeof o==="object"&&o.type==="open"){
        var fn=o.callback||null;
        if($rep.length===0){
            $rep=$("<div class='comm-ret'></div>").appendTo($page);
            $area=$("<textarea class='comm-ret-area' placeholder='"+(o.cap||'请输入文字：')+"'></textarea>").appendTo($rep);
        }
        if(o.focus!==false){
            //alert($area.length);
            $area[0].focus();
        }
        $rep.on("keydown",function(e){
            if(e.keyCode===13){
                if(fn){
                    fn($area.val());
                    $rep.remove();
                }
            }
        })
    }
}
//设置用户信息
function setUserinfo(){
    var cb=arguments[0];
    if(oUserinfo.info&&!arguments[1]){
        cb&&cb(oUserinfo.info);
        return;
    }
    Util.callService({
        url:oUserinfo.addr.interface+"/index.php?d=account&c=account&m=getProfile",
        paras:{
            type:2
        },
        callback:function(data){
            oUserinfo.info=oUserinfo.info||{};
            for(var k in data.data){
                oUserinfo.info[k]=data.data[k];
            }
            console.log("更新了个人中心");
            cb&&cb(oUserinfo.info);
        }
    });
}






















