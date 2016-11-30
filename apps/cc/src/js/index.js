/**
 * Created by Administrator on 2016/8/3.
 */
var oUserinfo={
    wid:getUrlval("wid")||"ctb_love",
    openid:getUrlval("openid")||"love_chetuobang_forever_543720",
    uid:getUrlval("uid")||"love_chetuobang_forever_1314",
    unid:getUrlval("unid")||"love_chetuobang",
    from:getUrlval("from")||null
};
var __paras={
    addr:{
        'root':"http://wxlk.chetuobang.com",
        'interface':"http://weixin.chetuobang.com/web_weixinlukuang",
        'wx_callback':"",
        'file':""
    }
};
var urls=[
    __paras.addr.interface+"/index.php?d=v4_violate_info&c=v4_violate_info&m=plateinfo",
    "http://localhost:3000"
];
