//创建时间：2015年12月24日 15:08:23
//创建人：李君
//最后更新时间：2015年12月24日 15:08:28
//更新人：李君
//说明：行程详情
!function($){
    var $uploadbt=$("#upload-bt");
    var $upContact=$("#upload-contact");
    var $upSex=$(".sel-sex");
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
    var owner_uid,psr_id;
    var status,psrStatus,buttonStatus;
    var phoneOwner;
    var $tabPasser=$("#passer-tab");
    var $tabPasser2=$("#passer2-tab");
    var $tabOwner=$("#owner-tab");
    var $owner=$("#tripde-owner");
    var $passenger=$("#tripde-passenger-list");
    //获取信息
    var opa={
        pinche_id:getUrlval("id")
    }
    callService({
        url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m="+(localStorage.identifytype=="1"?"get_carsharing_owner":"get_carsharing_passenger"),
        type:"post",
        paras:opa,
        callback:function(data){
            if(data){
                if(+data.ret==200){
                    if(data.data.length!=0){
                        //拼装
                        var $list=$("#tripdelist");
                        var str="";
                        var v=data.data;
                        price= v.seat_price;
                        maxSeat= v.seat_count;
                        owner_uid= v.owner_uid;
                        status= v.status;
                        if(v.psr_status){
                            psrStatus= v.psr_status;
                        }
                        if(v.psr_id){
                            psr_id= v.psr_id;
                        }
                        phoneOwner= v.cellphone;
                        buttonStatus= v.button_status;
                        if(localStorage.identifytype=="1"){
                            $owner.text(v.name);
                            $passenger.empty();
                            var strPsr="";
                            for(var i= 0,len=v.passenger_list.length;i<len;i++){
                                strPsr+=v.passenger_list[i].surname+(v.passenger_list[i].sex==1?"先生":"女士")+"、";
                            }
                            if(strPsr.trim()==""){
                                strPsr='<cite class=\"cl-grey\">暂无乘客</cite>';
                            }else{
                                strPsr=strPsr.substring(0,strPsr.length-1);
                            }
                            $passenger.html(strPsr);
                        }

                        str+='<li class="hasborder">';
                        str+='<span class="flist-tit"></span>';
                        str+='<span class="flist-sub tripde-sche" style="line-height:170%;">';
                        str+='<h2 class="cl-org">'+v.start_province+v.start_city+v.start_area+'-'+ v.end_province+ v.end_city+ v.end_area+'</h2>';
                        str+='<h4>'+ v.start_date+' '+ v.time_start.substring(0,5)+'-'+v.time_end.substring(0,5)+'</h4>';
                        str+='</span>';
                        str+='</li>';
                        str+='<li><label class="flist-tit lab-t">车型：</label><span class="flist-sub">'+ v.car_brand+ v.car_line+" "+ carColor[v.car_color]+'</span></li>';
                        str+='<li><label class="flist-tit lab-t">联系人：</label><span class="flist-sub">'+ v.surname+(v.sex==1?"先生":"女士")+'</span></li>';
                        str+='<li><label class="flist-tit lab-t">剩余座位：</label><span class="flist-sub">'+ v.seat_count+'</span></li>';
                        str+='<li><label class="flist-tit lab-t">费用：</label><span class="flist-sub" data-price="'+ v.seat_price+'" id="upload-price">'+ v.seat_price+'元/人</span></li>';
                        str+='<li class="hasborder"><label class="flist-tit lab-t">备注：</label><span class="flist-sub">'+ (v.comment?v.comment:"<cite class=\"cl-grey\">没有添加备注</cite>")+'&nbsp;</span></li>';
                        $list.html(str);
                        var sum=1*price;
                        $upSum.attr("data-sum",sum).text(sum+"元");
                        $(window).trigger("resize");
                        if(maxSeat>0){
                            pageCallback();
                        }else{
                            pageCallback();
                        }
                    }
                }else{
                    $uploadbt.text("无此数据");
                    ErrorAlert(data.error);
                }
            }
            //弹框-数量加减
            $.numPlusMinus({
                box: $("#sel-seat"),
                min: 1,
                max:maxSeat,
                type:"touchstart",
                onchange:function(n){
                    var sum=n*price;
                    $upSum.attr("data-sum",sum).text(sum+"元");
                }
            });
        }
    });
    function pageCallback(){
        //弹框-联系车主，立即拼车
        !function(){
            if(localStorage.identifytype=="1"){
                if(status=="1"){
                    if(getUrlval("uid")!=owner_uid){
                        $uploadbt.addClass("disable").text("同是车主，不能拼车");
                        $tabOwner.remove();
                        $tabPasser.remove();
                    }else{
                        $tabOwner.show();
                        $tabPasser.remove();
                        $(window).trigger("resize");
                        $uploadbt.text("取消发布").on("click",function(){
                            Util.maiDian({key:"cancel_trip_owner"});//埋点
                            SelectAlert([{
                                id:"1",
                                value:"已电话沟通与乘客达成一致，乘客行程有变化"
                            },{
                                id:"2",
                                value:"已电话沟通与乘客达成一致，其他原因"
                            }],function(data){
                                var opa={
                                    pinche_id:getUrlval("id"),
                                    cancel_msg:data.value
                                }
                                callService({
                                    url: oVersion.addr.interface + "/index.php?d=pinche&c=car_sharing&m=cancel_carsharing_owner",
                                    type: "post",
                                    paras: opa,
                                    callback: function (data) {
                                        if (data) {
                                            if (+data.ret == 200) {
                                                location.reload();
                                            } else {
                                                ErrorAlert(data.error);
                                            }
                                        }
                                    }
                                });
                            });
                        });
                    }
                    //$uploadbt.addClass("disable").text("拼车中").off("click");
                    //return;
                }else if(status=="0"){
                    $uploadbt.addClass("disable").text("该行程已取消");
                }else if(status=="3"){
                    $uploadbt.addClass("disable").text("已结束");
                }
            }else{
                $tabOwner.remove();
                if(status=="1"){//行程有效
                    if(psrStatus=="1"){//本乘客已经拼过此行程
                        $tabPasser.remove();
                        $tabPasser2.show();
                        $uploadbt.text("取消拼车");
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
                        $uploadbt.on("click",function(){
                            Util.maiDian({key:"cancel_trip_psr"});//埋点
                            var thisid=psr_id;
                            var pid=getUrlval("id");
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
                                                Util.locationHref("trip_psr.html");
                                            }else{
                                                ErrorAlert(data.error);
                                            }
                                        }
                                    }
                                });
                            });
                        });
                    }else{//本乘客尚未拼过此行程
                        $tabPasser2.remove();
                        $tabPasser.show();
                        if(maxSeat<=0){
                            $tabPasser.remove();
                            $uploadbt.addClass("disable").text("座位已经被预定空了");
                            return;
                        }
                        $uploadbt.on("click",function(){
                            Util.maiDian({key:"tripde_psr_subt"});//埋点
                            if($("#agree-ckb").attr("checked")!="checked"){
                                ErrorAlert("您需要同意保险相关协议");
                                return false;
                            }
                            $("#model-pop1").bottomUp("open");
                            $(window).trigger("resize");
                        });
                        $("#model-pop1").bottomUp({
                            autoOpen: false,
                            scale: false,
                            layer: true,
                            closeBt:true,
                            layerClose:true,
                            buttons:[{
                                title:"取消",
                                cli:function(){
                                    $("#model-pop1").bottomUp("close");
                                }
                            },{
                                title:"确认，呼叫车主",
                                cli:function(){
                                    //$("#model-pop1").bottomUp("close");
                                    //ajax
                                    var opa={
                                        pinche_id:getUrlval("id"),
                                        surname:$upContact.val(),
                                        name:$upName.val(),
                                        card_id:$upCard.val(),
                                        sex:$upSex.filter("[checked=checked]").val(),
                                        comment:$upNote.val(),
                                        auth_code:$upCode.val(),
                                        cellphone:$upPhone.val(),
                                        seat_count:$("#upload-seat").val()
                                    }
                                    if(!formateForm()){
                                        return;
                                    }
                                    callService({
                                        url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=save_carsharing_passenger",
                                        type:"post",
                                        paras:opa,
                                        callback:function(data){
                                            if(data){
                                                if(+data.ret==200){
                                                    if(data.data.length!=0){
                                                        Util.maiDian({key:"tripde_psr_confirm"});//埋点
                                                        Util.clearForm();
                                                        $("#model-pop1").bottomUp("close");
                                                        SuccessAlert("提交成功");
                                                        $uploadbt.text("已提交，点击进入我的行程").off("click").on("click",function(){
                                                            Util.locationHref("trip_psr.html");
                                                        });
                                                        if(buttonStatus==0){
                                                            location.href="tel:"+phoneOwner;
                                                        }else{
                                                            SuccessAlert("您的信息已经提交给车主了，请耐心等待");
                                                        }
                                                        //Util.locationHref("trip_psr.html");
                                                    }
                                                }else{
                                                    ErrorAlert(data.error);
                                                }
                                            }
                                        }
                                    })
                                }
                            }]
                        });
                    }
                }else{//行程无效
                    $tabPasser.remove();
                    $tabPasser2.remove();
                    $uploadbt.addClass("disable");
                    if(status=="0"){
                        $uploadbt.text("该行程已取消");
                    }if(status=="3"){
                        $uploadbt.text("已结束");
                    }
                }
            }
            $(window).trigger("resize");
        }();
        //验证码
        $.VerifiCode({
            bt:$upCodebt,
            delay:30,
            fnWrong:function(){
                ErrorAlert("手机号码格式错误");
            },
            num:$upPhone,
            callback:function(){
                var opa={
                    mobile_phone:textTrim($upPhone.val())
                }
                callService({
                    url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=auth_code",
                    type:"get",
                    paras:opa,
                    callback:function(data){
                        if(data){
                            if(+data.ret==200){
                            }else{
                                ErrorAlert(data.error);
                            }
                        }
                    }
                });
            }
        });

        //表单验证
        function formateForm(){
            if(!isFormatedForNull()){
                return false;
            }
            if(!checkName($upContact.val().trim(),true)){
                ErrorAlert("联系人格式不正确");
                return false;
            }
            if(!checkName($upName.val().trim())){
                ErrorAlert("真实姓名格式不正确");
                return false;
            }
            if(!checkIDCard($upCard.val().trim())){
                ErrorAlert("身份证号码格式不正确");
                return false;
            }
            if(!checkMobile($upPhone.val().trim())){
                ErrorAlert("手机号码格式不正确");
                return false;
            }
            if($upCode.val().trim().length<4){
                ErrorAlert("验证码格式不正确");
                return false;
            }
            if($("#agree-ckb").attr("checked")!="checked"){
                ErrorAlert("您需要同意保险相关协议");
                return false;
            }
            return true;
        }
    }
}(jQuery);



































