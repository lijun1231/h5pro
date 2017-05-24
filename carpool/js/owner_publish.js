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
        //数量加减
        $.numPlusMinus({
            box: $("#sel-seat"),
            min: 1,
            max:6,
            type:"touchstart"
        });
        //下一步
        var $uploadbt=$("#upload-bt");
        var $upPlaceS=$("#upload-place-s");
        var $upPlaceE=$("#upload-place-e");
        var $upDate=$("#upload-date");
        var $upCar=$("#upload-car");
        var $upCarColor=$("#upload-color");
        var $upSeat=$("#upload-seat");
        var $upPrice=$("#upload-price");
        var $upContact=$("#upload-contact");
        var $upSex=$(".sel-sex");
        var $upPhone=$("#upload-phone");
        var $upNote=$("#upload-note");
        $uploadbt.on("click",function(){
            if(formateForm()){
                var opa={
                    surname:$upContact.val(),
                    name:"",
                    card_id:"",
                    car_plate:"",
                    sex:$upSex.filter("[checked=checked]").val(),
                    cellphone:$upPhone.val(),
                    start_province:$upPlaceS.attr("data-provinceid"),
                    start_city:$upPlaceS.attr("data-cityid"),
                    start_area:$upPlaceS.attr("data-areaid"),
                    end_province:$upPlaceE.attr("data-provinceid"),
                    end_city:$upPlaceE.attr("data-cityid"),
                    end_area:$upPlaceE.attr("data-areaid"),
                    start_date:$upDate.attr("data-date"),
                    time_start:$upDate.attr("data-timestart"),
                    time_end:$upDate.attr("data-timeend"),
                    car_color:$upCarColor.children("option:selected").val(),
                    car_color_text:$upCarColor.children("option:selected").text(),
                    car_brand:$upCar.attr("data-brandid"),
                    car_line:$upCar.attr("data-typeid"),
                    car_text:$upCar.val(),
                    seat_count:$upSeat.val(),
                    seat_price:$upPrice.val(),
                    comment:$upNote.val(),
                    auth_code:""
                }
                opa.surname_sex_text=opa.surname+(opa.sex=="1"?"先生":"女士");
                opa=textTrim(opa);
                localStorage.ownerPublish=JSON.stringify(opa);
                Util.clearForm();
                Util.locationHref("insurance.html");
            }
        })
        //表单验证
        function formateForm(){
            if(!isFormatedForNull()){
                return false;
            }
            //起终点不能完全相同
            var startProvince=$upPlaceS.attr("data-provinceid");
            var startCity=$upPlaceS.attr("data-cityid");
            var startArea=$upPlaceS.attr("data-areaid");
            var endProvince=$upPlaceE.attr("data-provinceid");
            var endCity=$upPlaceE.attr("data-cityid");
            var endArea=$upPlaceE.attr("data-areaid");
            if(startProvince.trim()===endProvince.trim()&&startCity.trim()===endCity.trim()&&startArea.trim()===endArea.trim()){
                ErrorAlert("起终不能相同");
                return false;
            }
            if(!$upDate.attr("data-date")||!$upDate.attr("data-timestart")||!$upDate.attr("data-timeend")){
                ErrorAlert("出发时间不完整");
                return false;
            }
            var price=$upPrice.val().trim();
            if(!Number(price)&&Number(price)!=0){
                ErrorAlert("价格必须是数字");
                return false;
            }else if(Number(price)>9999||Number(price)<0){
                ErrorAlert("价格必须为0~9999的数字");
                return false;
            }
            if(!checkName($upContact.val().trim(),true)){
                ErrorAlert("联系人格式不正确");
                return false;
            }
            if(!checkMobile($upPhone.val().trim())){
                ErrorAlert("手机号码格式不正确");
                return false;
            }
            if($("#agree-ckb").attr("checked")!="checked"){
                ErrorAlert("您需要同意春节拼车条款");
                return false;
            }
            return true;
        }
    });
}(jQuery);



































