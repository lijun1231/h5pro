//创建时间：2016年1月4日 10:40:22
//创建人：李君
//最后更新时间：2016年1月4日 10:40:27
//更新人：李君
//说明：我是车主-拼车请求
!function($){
    if(localStorage.identifytype!="1"){
        Util.locationHref("index.html");
    }
    //获取信息
    var opa={
        pinche_id:getUrlval("id")
    }
    callService({
        url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=request_carsharing_list",
        type:"post",
        paras:opa,
        callback:function(data){
            if(data){
                if(+data.ret==200){
                    if(data.data.length!=0){
                        var info=data.data.info;
                        var $hd=$("#triporderheader");
                        var strhd="";
                        strhd+='<h2 class="cl-org">'+ info.start_province+ info.start_city+'-'+ info.end_province+ info.end_city+'</h2>';
                        strhd+='<h4>'+ info.start_date+' '+ info.time_start.substring(0,5)+'-'+info.time_end.substring(0,5)+'</h4>';
                        if(data.data.list){
                            strhd+='<h4>&nbsp;有'+ (+data.data.list.length)+'个拼车请求</h4>';
                        }else{
                            strhd+='<h4>&nbsp;暂无拼车请求</h4>';
                        }
                        $hd.html(strhd);
                        if(data.data.list&&data.data.list.length!=0){
                            var result=data.data.list;
                            result.reverse();
                            var str="";
                            var $list=$("#triporderlist");
                            for(var i= 0,len=result.length;i<len;i++){
                                var v=result[i];
                                if(v.status=="1"){
                                    status="已同意";
                                    str+='<li data-id="'+ v.id+'" data-uid="'+ v.passenger_uid+'" data-wid="'+ v.passenger_wid+'" class="disable">';
                                }else if(v.status=="2"){
                                    status="同意拼车，添加乘客";
                                    str+='<li data-id="'+ v.id+'" data-uid="'+ v.passenger_uid+'" data-wid="'+ v.passenger_wid+'">';
                                }else if(v.status=="0"){
                                    status="乘客已取消";
                                    str+='<li data-id="'+ v.id+'" data-uid="'+ v.passenger_uid+'" data-wid="'+ v.passenger_wid+'" class="disable">';
                                }
                                str+='<div class="order-list-sub clear-after">';
                                if(v.headpic){
                                    str+='<i class="order-list-sub-pic responsive-pic"><img src="'+ v.headpic+'"/></i>';
                                }else{
                                    str+='<i class="order-list-sub-pic responsive-pic"><img src="images/passer.png"/></i>';
                                }
                                str+='<div class="order-list-sub-con f-right">';
                                str+='<span>'+ v.surname+(v.sex==1?"先生":"女士")+'<em class="order-list-sub-con-t">'+ v.seat_count+'人</em></span>';
                                str+='<div class="order-list-sub-con-tip cl-grey">备注：'+ (v.comment?v.comment:"<cite class=\"cl-grey\">没有添加备注</cite>")+'</div>';
                                str+='<button class="order-list-sub-con-bt subt lb bt-red agree-upload">'+status+'</button>';
                                str+='<div class="order-list-sub-con-aside f-right cl-green" onclick="location.href=\'tel:'+ v.cellphone+'\'"></div>';
                                str+='</div>';
                                str+='</div>';
                                str+='</li>';
                            }
                            $list.html(str);
                            $list.children("li.disable").find(".agree-upload");
                            $(window).trigger("resize");
                            pageCallback();
                        }
                    }
                }else{
                    ErrorAlert(data.error);
                }
            }
        }
    });
    function pageCallback(){
        $(document).on("click",".agree-upload:not(.bt-disable)",function(){
            var $ch=$(this).closest("li");
            if($ch.hasClass("disable")){
                return;
            }
            var $this=$(this);
            var opa={
                id:$ch.attr("data-id"),
                pinche_id:getUrlval("id"),
                passenger_uid:$ch.attr("data-uid"),
                passenger_wid:$ch.attr("data-wid")
            }
            callService({
                url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=save_carsharing_affirm",
                type:"post",
                paras:opa,
                callback:function(data){
                    if(data){
                        if(+data.ret==200){
                            if(data.data.length!=0){
                                $this.text("已同意").off("click");
                                $this.closest("li").addClass("disable");
                            }
                        }else{
                            ErrorAlert(data.error);
                        }
                    }
                }
            });
        });
    }
}(jQuery);



































