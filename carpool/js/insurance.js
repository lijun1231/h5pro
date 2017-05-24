//创建时间：2015年12月24日 15:08:23
//创建人：李君
//最后更新时间：2015年12月24日 15:08:28
//更新人：李君
//说明：我是车主-发布行程
!function($){
    if(localStorage.identifytype!="1"){
        Util.locationHref("index.html");
    }
    $(function(){
        //下一步
        var $uploadbt=$("#upload-bt");
        var $upName=$("#upload-name");
        var $upCard=$("#upload-card");
        var $upCar=$("#upload-car");
        var $upPlatetype=$("#upload-platetype");
        var $upPlatecode=$("#upload-platecode");
        var $upContact=$("#upload-contact");
        var $upPhone=$("#upload-phone");
        var $upCode=$("#upload-code");
        var $upCodebt=$("#upload-codebt");
        if(!localStorage.ownerPublish){
            Util.locationHref("index.html");
        }
        var oPublish=JSON.parse(localStorage.ownerPublish);
        $upContact.text(oPublish.surname_sex_text);
        $upCar.text(oPublish.car_text+" "+oPublish.car_color_text);
        $upPhone.val(oPublish.cellphone);
        $uploadbt.on("click",function(){
            if(formateForm()){
                oPublish.name=$upName.val().trim();
                oPublish.car_plate=($upPlatetype.children("option:selected").val()+$upPlatecode.val()).trim().toUpperCase();
                oPublish.card_id=$upCard.val().trim();
                oPublish.cellphone=$upPhone.val().trim();
                oPublish.auth_code=$upCode.val().trim();
                localStorage.ownerPublish=JSON.stringify(oPublish);
                callService({
                    url:oVersion.addr.interface+"/index.php?d=pinche&c=car_sharing&m=save_carsharing_owner",
                    type:"post",
                    paras:oPublish,
                    callback:function(data){
                        if(data){
                            if(+data.ret==200){
                                if(data.data.length!=0){
                                    Util.clearForm();
                                    localStorage.removeItem("ownerPublish");
                                    Util.locationHref("success_publish.html"+location.search);
                                }
                            }else{
                                ErrorAlert(data.error);
                            }
                        }else{
                            Util.locationHref("index.html");
                        }
                    }
                });
            }
        });
        //验证码
        $.VerifiCode({
            bt:$upCodebt,
            delay:30,
            fnWrong:function(){
                ErrorAlert("手机号码格式不正确");
            },
            num:$upPhone,
            callback:function(){
                var opa={
                    mobile_phone:$upPhone.val().trim()
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
            if(!checkName($upName.val().trim())){
                ErrorAlert("真实姓名格式不正确");
                return false;
            }
            if(!checkIDCard($upCard.val().trim())){
                ErrorAlert("身份证号码格式不正确");
                return false;
            }
            if(!checkCarPlate($upPlatecode.val().trim())){
                ErrorAlert("车牌号格式不正确");
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
    });
}(jQuery);



































