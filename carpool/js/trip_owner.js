//创建时间：2016年1月4日 10:47:45
//创建人：李君
//最后更新时间：2016年1月4日 10:47:49
//更新人：李君
//说明：我是车主-行程列表
!function($){
    if(localStorage.identifytype!="1"){
        Util.locationHref("index.html");
    }
    //获取信息
    var button_status;
    var $subt=$("#trip-ownerbt");
    callService({
        url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=get_list_carsharing",
        type:"post",
        paras:{identifying:localStorage.identifytype},
        callback:function(data){
            if(data){
                if(+data.ret==200){
                    var $list=$("#tripownerlist");
                    if(data.data.length!=0){
                        var result=data.data.list;
                        result.reverse();
                        button_status=data.data.button_status;
                        var str="";
                        for(var i= 0,len=result.length;i<len;i++){
                            var v=result[i];
                            var status="";
                            if(v.status=="1"){
                                if(+v.seat_count==0){
                                    status="已满";
                                }else{
                                    status="拼车中";
                                    str+='<li id="'+ v.pinche_owner_id+'">';
                                }
                            }else if(v.status=="2"){
                                status="拼车成功";
                                str+='<li id="'+ v.pinche_owner_id+'">';
                            }else if(v.status=="3"){
                                status="已结束";
                                str+='<li id="'+ v.pinche_owner_id+'" class="disable">';
                            }else if(v.status=="0"){
                                status="已取消";
                                str+='<li class="disable">';
                            }
                            str+='<div class="trip-list-sub">';
                            str+='<div class="trip-list-sub-con">';
                            str+='<span>'+ v.start_date+' '+ v.time_start.substring(0,5)+'-'+v.time_end.substring(0,5)+'</span>';
                            str+='<div class="h2 cl-org">'+v.start_province+v.start_city+'-'+ v.end_province+ v.end_city+'</div>';
                            str+='<div class="trip-list-sub-con-aside cl-green">'+ status+'</div>';
                            str+='</div>';
                            str+='</div>';
                            str+='<div  class="buttons-box trip-list-bts clear-after">';
                            if(v.status=="0"||v.status=="3"){
                                str+='<button class="subt lb bt-red" style="visibility:hidden;">已结束<em class="cl-org trip-list-bts-n">'+ v.request_carsharing+'</em></button>';
                            }else{
                                str+='<button class="subt lb bt-red" data-href="trip_order.html?id='+ v.pinche_owner_id+'">拼车请求<em class="cl-org trip-list-bts-n">'+ v.request_carsharing+'</em></button>';
                            }
                            str+='<button class="subt lb bt-red" data-href="tripde.html?id='+ v.pinche_owner_id+'">行程详情</button>';
                            str+='</div>';
                            str+='</li>';
                        }
                        $list.html(str);
                        $(window).trigger("resize");
                        pageCallback();
                    }else{
                        $list.html('<div style="text-align:center;padding:1rem 0;">暂无行程信息</div>');
                        $subt.on("click",function(){
                            Util.maiDian({key:"create_trip_subt"});//埋点
                            Util.locationHref("owner_publish.html");
                        });
                        //Util.locationHref("owner_publish.html");
                    }
                }else{
                    ErrorAlert(data.error);
                }
            }
        }
    });
    function pageCallback(){
        if(button_status=="0"){
            $subt.on("click",function(){
                Util.maiDian({key:"create_trip_subt"});
                Util.locationHref("owner_publish.html");
            });
        }else if(button_status=="1"){
            $subt.addClass("disable").text("每天发布次数不得超过3次");
        }else if(button_status=="2"){
            $subt.addClass("disable").text("已有一条行程正在拼车中");
        }
    }
}(jQuery);



































