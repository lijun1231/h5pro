/**
 * Created by Administrator on 2016/8/3.
 */
define(['lib'],function(_){
    var Index={};
    Index.oUserinfo={
        wid:_.getUrlval("wid")||"ctb_love",
        openid:_.getUrlval("openid")||"love_chetuobang_forever_543720",
        uid:_.getUrlval("uid")||"love_chetuobang_forever_1314",
        unid:_.getUrlval("unid")||"love_chetuobang",
        from:_.getUrlval("from")||null
    };
    var __paras={
        addr:{
            'root':"http://wxlk.chetuobang.com",
            'interface':"http://weixin.chetuobang.com/web_weixinlukuang",
            'wx_callback':"",
            'file':""
        }
    };
    Index.urls=[
        __paras.addr.interface+"/index.php?d=v4_violate_info&c=v4_violate_info&m=plateinfo",
        "http://localhost:3000"
    ];
    return Index;
});