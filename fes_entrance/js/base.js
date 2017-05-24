//创建时间：2015年12月24日 15:10:56
//创建人：李君
//最后更新时间：2015年12月24日 15:20:28
//更新人：李君
//说明：配置
var oVersion={//版本控制
	v:"1.0",
    /**
     * 公用配置
     */
    addr:{
        'root':"http://805.chetuobang.com",
        'interface':"http://805.chetuobang.com/web_weixinlukuang",
        'carpool':"http://805.chetuobang.com/carpool"
    }
};
if(oVersion.v==localStorage.locVersion){//无版本更新
	oVersion.r=false;
}else{//有版本更新
    localStorage.clear();
	oVersion.r=true;
	localStorage.locVersion=oVersion.v;
}
console.log("版本："+oVersion.v);
console.log("更新版本："+oVersion.r);
//oVersion.oDom用于为动态添加的dom配置属性，属性内容根据cssLink进行判定，所以type必须具有唯一性
oVersion.oDom = [{
    "type":"cssLink",
    "dom":"link",
    "url": "href",
    "paras": {
        "rel": "stylesheet",
        "type": "text/style"
    }
},{
    "type":"iconLink57",
    "dom":"link",
    "url": "href",
    "paras": {
        "rel": "apple-touch-icon-precomposed",
        "sizes": "57x57"
    }
},{
    "type":"iconLink72",
    "dom":"link",
    "url": "href",
    "paras": {
        "rel": "apple-touch-icon-precomposed",
        "sizes": "72x72"
    }
},{
    "type":"iconLink114",
    "dom":"link",
    "url": "href",
    "paras": {
        "rel": "apple-touch-icon-precomposed",
        "sizes": "114x114"
    }
}, {
    "type": "javascript",
    "dom":"script",
    "url": "src",
    "paras": {
        "type": "text/javascript",
        "defer":true
    }
}];
//-------------------
//加载多个文件，传入参数为：对象。对象属性解释如下
//list：路径数组，不可空
//type：文件类型（字符串），不可空，如css、script
//container：dom容器，不可空
//isLoad：列表是否一起加载，可空，true为是，否则将前一个loading完成之后再加载后一个
//callback：回调函数，可空
//-------------------
oVersion.loadFile=function(o){
	var list=o.list;
	var type=o.type;
    var loaded = 0;
    var len = list.length;
    var container = o.container;
    var isLoad=o.isLoad;
    var callback = o.callback ? o.callback:false;
    if(isLoad){
    	for(var i=0,len=list.length;i<len;i++){
    		oVersion.loadSingleFile({
    		    url: list[i],//资源数组
    			type:type,//资源dom类型
    			container:container//资源位置
    		});
    	}
    	return;
    }
    var loadNext = function () {
    	oVersion.loadSingleFile({
    		url:list[loaded],
    		type:type,
    		container:container,
    		callback: function () {
	            loaded++;
	            if (loaded >= len) {
	                if(callback){
	                    callback();
	                }
	            }
	            else {
	                loadNext();
	            }
	        }
    	});
    };
    loadNext();
};
//-------------------
//加载多个文件，传入参数为：对象。对象属性解释如下
//src：路径，不可空
//type：文件类型（字符串），不可空，如css、script
//callBack：回调函数，可空
//container：dom容器，不可空
//-------------------
oVersion.loadSingleFile = function (o) {
    var url = o.url;
    var type = o.type;
    var callback = o.callback ? o.callback : false;
    var container = o.container;
    for (var i = 0, len = oVersion.oDom.length; i < len; i++) {
        if (type == oVersion.oDom[i].type) {
            createDom(oVersion.oDom[i].dom,oVersion.oDom[i].paras);
            return;
        }
    }
    //执行创建
    function createDom(dom,paras) {
        var s = document.createElement(dom);
        for (key in paras) {
            s[key] = paras[key];
        }
        s[oVersion.oDom[i].url] = url+"?v="+oVersion.v;
        s.addEventListener('load', function () {
            this.removeEventListener('load', arguments.callee, false);
            if (callback) {
                callback();
            }
        }, false);
        container.appendChild(s);
    }
};

//-------------------
//所有资源加载完成后对图片等媒体文件执行更新
//操作对象：img标签、含background的dom
document.addEventListener('DOMContentLoaded', function(){
	var $dom=document.getElementsByTagName("*");//所有dom节点
    var $imgs = document.getElementsByTagName("img");
    var imgslen = $imgs.length;
    var $dom = document.getElementsByTagName("*");
    var domlen = $dom.length;
    for (var i = 0; i < imgslen; i++) {
        var imgPath=$imgs[i].src;
        if(imgPath.indexOf("?v=")==-1){
            $imgs[i].src=imgPath+"?v="+oVersion.v;
        }
    }
    for (var i = 0; i < domlen; i++) {
        var $othis = $dom[i];
        var t=hasStyle($othis,"backgroundImage");
        if (t) {
            var bgAttr = t;
            var bgPath = bgAttr.substring(bgAttr.indexOf("(") + 1, bgAttr.indexOf(")"));//将背景图片的地址取出来
            if (bgPath.indexOf("\"") != -1) {
                bgPath = bgPath.substring(bgPath.indexOf("\"") + 1, bgPath.lastIndexOf("\""));
            } else if (bgPath.indexOf("\'") != -1) {
                bgPath = bgPath.substring(bgPath.indexOf("\'") + 1, bgPath.lastIndexOf("\'"));
            }
            if(bgPath.indexOf("?v=")==-1){
                $othis.style.backgroundImage = bgPath + "?v=" + oVersion.v;
            }

        }
    }
}, false);
function hasStyle(ele, st) {
    var t = getComputedStyle ? getComputedStyle(ele)[st] : ele.currentStyle[st];
    if (t && t != "" && t != "none" && t.indexOf("http") != -1) {
		return t;
    } else {
		return false;
	}
}































