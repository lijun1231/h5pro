//创建时间：2016年1月3日 17:26:26
//创建人：李君
//最后更新时间：2016年1月3日 17:26:29
//更新人：李君
//说明：我是乘客-拼车请求
!function($){
    if(localStorage.identifytype!="2"){
        Util.locationHref("index.html");
    }
    var $uploadbt=$("#upload-bt");
    var $upContact=$("#upload-contact");
    var $upSex=$(".sel-sex[checked=checked]");
    var $upNote=$("#upload-note");
    var $upPhone=$("#upload-phone");
    var $upName=$("#upload-name");
    var $upCard=$("#upload-card");
    var $upCode=$("#upload-code");
    var $upCodebt=$("#upload-codebt");
    var $upPrice=$("#upload-price");
    var $upSum=$("#upload-sum");
    var maxSeat=0;
    var price=0;
    //获取信息
    callService({
        url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=get_list_carsharing",
        type:"post",
        paras:{identifying:localStorage.identifytype},
        callback:function(data){
            if(data){
                var $list=$("#trippsrlist");
                if(+data.ret==200&&data.data.length!=0){
                    var result=data.data;
                    result.reverse();
                    var str="";
                    for(var i= 0,len=result.length;i<len;i++){
                        var v=result[i];
                        var status="";
                        if(v.status=="1"){
                            status="成功";
                            str+='<li data-pid="'+ v.pinche_owner_id+'" data-id="'+ v.id+'">';
                        }else if(v.status=="2"){
                            status="拼车中";
                            str+='<li data-pid="'+ v.pinche_owner_id+'" data-id="'+ v.id+'">';
                        }else if(v.status=="3"){
                            status="已结束";
                            str+='<li data-pid="'+ v.pinche_owner_id+'" data-id="'+ v.id+'" class="disable">';
                        }else if(v.status=="0"){
                            status="已取消";
                            str+='<li data-pid="'+ v.pinche_owner_id+'" data-id="'+ v.id+'" class="disable">';
                        }
                        str+='<div class="trip-list-sub">';
                        if(v.headpic){
                            str+='<i class="trip-list-sub-pic responsive-pic"><img src="'+ v.headpic+'"/></i>';
                        }else{
                            str+='<i class="trip-list-sub-pic responsive-pic"><img src="images/passer.png"/></i>';
                        }
                        str+='<div class="trip-list-sub-con f-right">';
                        str+='<span>'+ v.start_date+' '+ v.time_start.substring(0,5)+'-'+v.time_end.substring(0,5)+'</span>';
                        str+='<div class="h2 cl-org">'+ v.start_province+ v.start_city+'-'+ v.end_province+ v.end_city+'</div>';
                        str+='<div class="trip-list-sub-con-aside f-right cl-green">'+ status+'</div>';
                        str+='</div>';
                        str+='</div>';
                        str+='<div  class="buttons-box trip-list-bts clear-after">';
                        str+='<button class="subt lb bt-red cancel-psr">取消拼车</button>';
                        str+='<button class="subt lb bt-red" data-href="tripde.html?id='+ v.pinche_owner_id+'">行程详情</button>';
                        str+='</div>';
                        str+='</li>';
                    }
                    $list.html(str);
                    $uploadbt=$list.children().not(".disable").find("");
                    $(window).trigger("resize");
                    pageCallback();
                }else{
                    $list.html('<div style="text-align:center;padding:1rem 0;">暂无拼车信息</div>');
                }
            }
            if(data&&+data.ret==200&&data.data.length!=0){
                var result=data.data;
                if(result&&result.length!=0){
                }
            }
        }
    });
    function pageCallback(){
    }
    //取消拼车
    var arrCancel=[{
        id:"1",
        value:"已电话沟通与车主达成一致，乘客行程有变化"
    },{
        id:"2",
        value:"已电话沟通与车主达成一致，车主行程有变化"
    },{
        id:"3",
        value:"已电话沟通与车主达成一致，其他原因"
    }];
    $(document).on("click",".cancel-psr",function(){
        var $ch=$(this).closest("li");
        if($ch.hasClass("disable")){
            return;
        }
        var thisid=$ch.attr("data-id");
        var pid=$ch.attr("data-pid");
        SelectAlert(arrCancel,function(data){
            var opa={
                cancel_msg:data.value,
                pinche_id:pid,
                id:thisid
            }
            callService({
                url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=cancel_carsharing_passenger",
                type:"post",
                paras:opa,
                callback:function(data){
                    if(data){
                        if(+data.ret==200){
                            SuccessAlert("取消成功");
                            $ch.addClass("disable");
                            $ch.find(".trip-list-sub-con-aside").text("已取消");
                            $(window).trigger("resize");
                        }else{
                            ErrorAlert(data.error);
                        }
                    }
                }
            });
        });
    });
}(jQuery);



































