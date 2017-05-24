//创建时间：2015年12月24日 15:00:00
//创建人：李君
//最后更新时间：2015年12月24日 15:00:06
//更新人：李君
//说明：样式控制
var cpViewpoint = document.getElementById("cpViewpoint");
!function(){
    //页面缩放
    var DeviceWidth = window.screen.availWidth;//先获取设备可用宽度
    var standardWidth = 375;//iPhone6/6S作为标准尺寸
    var scaling = (DeviceWidth/standardWidth).toFixed(5);
    var viewpointVal = "width=device-width,inital-scale="+scaling+",maximum-scale="+scaling+",user-scalable=no,minimal-ui;";
    cpViewpoint.setAttribute('content',viewpointVal);
    //页面缩放
    //var cpViewpoint = document.getElementById("cpViewpoint");
    //var DeviceWidth = window.screen.availWidth;//先获取设备可用宽度
    //var standardWidth = 375;//iPhone6/6S作为标准尺寸
    //var scaling = (DeviceWidth/standardWidth).toFixed(3);
    //$("body").css("fontSize",scaling*15+"px");
}();
$(function(){
    //公有--------------------
    //style-js
    !function(){
        //ticket-dot
        $(".ticket-dot-bottom").append("<i class='tk'></i>");
        $(".ticket-dot-top").append("<i class='tk'></i>");
        //flist
        $(".flist-tit").each(function(){
            $(this).next().css("marginLeft",$(this).width());
        });
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
    }();
    //script
    !function(){
    }();
    //根据页面执行函数
    !function(){
        var rp=cpViewpoint.getAttribute("data-page");//页面响应式标识
        try{
            oScriptPg[rp]();//页面响应式监听
            oListenRp[rp]();//页面执行脚本
            $(window).resize(oListenRp[rp]);//页面响应式动态监听
        }catch(e){}
    }();
});
var oListenRp={
    index:function(){
        //-------------------
        var $lstPic=$(".responsive-pic");
        var r=$lstPic.width();
        $lstPic.height(r);
    }
}
var oScriptPg={
    index:function(){
        //-------------------
        //我的行程
        var oWin={
            w:$(window).width(),
            h:$(window).height()
        }
        touch.on('#to-trip', 'touchstart', function(ev){
            ev.preventDefault();
        });
        var dx, dy;
        touch.on('#to-trip', 'drag', function(ev){
            dx = dx || 0;
            dy = dy || 0;
            var offx = dx + ev.x;
            var offy = dy + ev.y;
            this.style.webkitTransform = "translate3d(" + offx + "px," + offy + "px,0)";
        });

        touch.on('#to-trip', 'dragend', function(ev){
            dx += ev.x;
            dy += ev.y;
        });
    },
    tripde:function(){

    }
}
































