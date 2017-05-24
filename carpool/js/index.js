//创建时间：2015年12月24日 15:08:23
//创建人：李君
//最后更新时间：2015年12月24日 15:08:28
//更新人：李君
//说明：首页
!function($){
    var $tipTxt=$("#search-box").children("em");
    if(oUserinfo.share){
        var $popShare=$("#model-pop2");
        //弹框-分享二维码
        //$("#model-pop2").bottomUp({
        //    autoOpen: false,
        //    scale: false,
        //    closeBt:true,
        //    layerClose:true,
        //    layer: true
        //});
    }
    $(function(){
        var $totrip=$("#to-trip");
        //获取身份
        !function() {
            //ajax
            callService({
                url: oVersion.addr.interface + "/index.php?d=pinche&c=car_sharing&m=get_identity",
                unlock:true,
                type: "post",
                paras: {},
                callback: function (data) {
                    if (data) {
                        if (+data.ret == 200) {
                            if (data.data.length != 0) {
                                localStorage.identifytype=data.data.identifying;
                            }else{
                                //弹框-身份选择
                                $("#model-pop1").bottomUp({
                                    autoOpen: true,
                                    scale: false,
                                    layer: true
                                });
                                $("#to-owner").on("click", function () {
                                    chooseIdentify("1");
                                });
                                $("#to-passer").on("click", function () {
                                    chooseIdentify("2");
                                });
                            }
                        } else {
                            ErrorAlert(data.error);
                        }
                    }else{
                        Util.locationHref("index.html");
                    }
                }
            });
            //身份选择
            function chooseIdentify(t){
                callService({
                    url: oVersion.addr.interface + "/index.php?d=pinche&c=car_sharing&m=insert_identity",
                    type: "post",
                    paras: {identifying:t},
                    callback: function (data) {
                        if (data) {
                            if (+data.ret == 200) {
                                localStorage.identifytype = t;
                                $("#model-pop1").bottomUp("close");
                                if(t=="1"){
                                    Util.locationHref("owner_publish.html");
                                }
                            } else {
                                ErrorAlert(data.error);
                            }
                        }
                    }
                });
            }
        }();
        //我的行程按钮
        $totrip.on("click",function(){
            if(localStorage.identifytype=="1"){
                Util.locationHref("trip_owner.html");
            }else if(localStorage.identifytype=="2"){
                Util.locationHref("trip_psr.html");
            }
        });
        //列表
        !function(){
            var pageIndex=1;
            var $more=$("#loadingmore");
            var $list=$("#trip-list");
            var $stPlace=$("#filter-startplace");
            var $edPlace=$("#filter-endplace");
            var $date=$("#filter-date");
            var $sbt=$("#filter-subt");
            var strLoading=$more.html();
            var strLoaded='<div class="loader-crying"><i></i><em>没了~</em></div>';
            //ajax
            loadCapoolList();
            function loadCapoolList(){
                $more.html(strLoading);
                var opa={};
                if($stPlace.attr("data-provinceid")){
                    opa.start_province=$stPlace.attr("data-provinceid");
                }
                if($stPlace.attr("data-cityid")){
                    opa.start_city=$stPlace.attr("data-cityid");
                }
                if($edPlace.attr("data-provinceid")){
                    opa.end_province=$edPlace.attr("data-provinceid");
                }
                if($edPlace.attr("data-cityid")){
                    opa.end_city=$edPlace.attr("data-cityid");
                }
                if($date.attr("data-date")){
                    opa.start_date=$date.attr("data-date");
                }
                if($date.attr("data-timestart")){
                    opa.time_start=$date.attr("data-timestart");
                }
                if($date.attr("data-timeend")){
                    opa.time_end=$date.attr("data-timeend");
                }
                opa.page=pageIndex;
                callService({
                    url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=get_lists_carsharing",
                    unlock:true,
                    type:"post",
                    paras:opa,
                    callback:function(data){
                        if(data&&+data.ret==200&&data.data.length!=0){
                            var result=data.data.list;
                            var oPage=data.data.page;
                            var pal=data.data.pal;
                            if(pal){
                                $tipTxt.html('<i>共有<cite class="cl-org">'+pal+'</cite>人与您同路，去和Ta们打个招呼吧~</i><br/>同行拼车车主搜索结果：');
                                $tipTxt.on("click",function(){
                                    Util.maiDian({key:"main_pal"});
                                    Util.locationHref("../h5_yltx/index.html?src=carpool&uid="+oUserinfo.uid+"&wid="+oUserinfo.wid+"&unid="+oUserinfo.unid+"&sCity="+$stPlace.attr("data-citytxt")+"&sCode="+$stPlace.attr("data-cityid")+"&eCity="+$edPlace.attr("data-citytxt")+"&eCode="+$edPlace.attr("data-cityid"));
                                });
                            }else{
                                $tipTxt.off("click");
                                $tipTxt.html('搜索结果');
                            }
                            if(result&&result.length!=0){
                                var str="";
                                for(var i= 0,len=result.length;i<len;i++){
                                    var v=result[i];
                                    //if(oUserinfo.share){
                                    //    str+='<li class="sharein-list-item">';
                                    //}else{
                                    //    str+='<li data-href="tripde.html?id='+ v.id+'">';
                                    //}
                                    str+='<li data-href="tripde.html?id='+ v.id+'">';
                                    str+='<h3>'+ v.start_date+' '+ v.time_start.substring(0,5)+'-'+v.time_end.substring(0,5)+'</h3>';
                                    str+='<div class="pool-box-list-box">';
                                    if(v.headpic){
                                        str+='<i class="responsive-pic"><img src="'+ v.headpic+'"/></i>';
                                    }else{
                                        str+='<i class="responsive-pic"><img src="images/car2.png"/></i>';
                                    }
                                    str+='<div class="pool-box-list-box-con">';
                                    str+='<span>';
                                    str+='<em>'+ v.start_province+ v.start_city+ v.start_area+'</em>';
                                    str+='<em>-</em>';
                                    str+='<em>'+ v.end_province+ v.end_city+ v.end_area+'</em>';
                                    str+='</span>';
                                    str+='<span class="cl-grey">'+ v.surname+(v.sex==1?"先生":"女士")+'</span>';
                                    str+='<span class="cl-grey">'+ v.car_brand+ v.car_line+" "+ carColor[v.car_color]+'</span>';
                                    str+='</div>';
                                    str+='<div class="pool-box-list-box-tip">';
                                    str+='<span class="cl-org"><h2>'+ v.seat_price+'元</h2>/座</span>';
                                    str+='<h4 class="cl-grey">剩余座位：<em class="cl-org">'+ v.seat_count+'</em></h4>';
                                    str+='</div>';
                                    str+='</div>';
                                    str+='<div class="clear-fix"></div>';
                                    str+='</li>';
                                }
                                $list.append(str);
                                $(window).trigger("resize");
                            }else{
                                $more.html(strLoaded);
                            }
                        }else{
                            $more.html(strLoaded);
                        }
                        if(pageIndex<oPage.pageCount){
                            pageIndex=1+(+oPage.page);
                        }else{
                            $more.html(strLoaded);
                            return;
                        }
                        $(window).on("scroll",loadMoreList);
                    }
                });
            }
            //筛选
            $sbt.on("click",function(){
                $list.empty();
                pageIndex=1;
                $(window).off("scroll",loadMoreList);
                loadCapoolList();
            });
            //下拉翻页
            function loadMoreList(){
                if(isPageEnd()){
                    $(window).off("scroll",loadMoreList);
                    loadCapoolList();
                }
            }
        }();
    });
    //分享进来的页面点击列表项
    //$(document).on("touchend",".sharein-list-item",function(){
    //    $popShare.bottomUp("open");
    //});
    //行程列表埋点
    $(document).on("click","#trip-list>li",function(){
        Util.maiDian({key:"main_list_item"});
    });
}(jQuery);



































