var VM={};!function(){var e=j_m.currPage;e.hook(function(){var t=$(j_m.currPage[0]),n=e.vm;n?n.sendPhoneCode():n=e.vm=new Vue({el:t[0],data:{user_name:"",name_able:!0,user_email:"",mobile:"",user_units:"",user_duty:"",user_application:""},ready:function(){Junb.addClass(e[0],"ready"),$("#j-body").show(),j_m.compilePage(),setTimeout(function(){j_m.compilePage()},100)},set:function(e){},methods:{fnSub:function(){var e=this;this.$data;e.formateForm()&&$.ajax({url:"http://www.sooneus.tv/wechat_web/index.php?d=base&c=admin_Register&m=ajax_saveUserInfo",type:"post",data:{user_name:n.user_name,user_email:n.user_email,mobile:n.mobile,user_units:n.user_units,user_duty:n.user_duty,user_application:n.user_application,secret:oUserinfo.secret},dataType:"json",success:function(e){0===+e.errcode?Util.Alert("提交成功，我们将尽快审核，请您耐心等待..."):+e.errcode&&Util.Alert("操作超时或其他管理员已操作")}})},formateForm:function(){return isFormatedForNull()?Util.checkMobile(n.mobile)?Util.isEmail(n.user_email)?!0:(Util.Alert("请输入正确的邮箱"),!1):(Util.Alert("请输入正确的手机号码"),!1):!1},sendPhoneCode:function(){var e=t.find("#edit-upload-codebt"),i=t.find("#edit-upload-phone");$.VerifiCode({bt:e,num:i,delay:30,check:function(){return e.hasClass("on")?void 0:!1},callback:function(){Util.callService({url:oUserinfo.addr["interface"]+"/index.php?d=account&c=account&m=sendAuthcode",paras:{mobile:n.mobile,sms_type:"1"},callback:function(e){}})},fnWrong:function(){Util.Alert("手机号格式错误")}})},toggleTag:function(e,t){this.getItmById("tag_id",this.atags,e,function(e){e.c=!e.c,n.tag_ids=function(){for(var e="",t=n.atags,i=0;i<t.length;i++)t[i].c&&(e+=t[i].tag_id);return e.split("").join(",")}()})},getItmById:function(e,t,n,i){for(var a=0;a<t.length;a++)if(n==t[a][e])return i&&i(t[a]),!0;return!1}}})})}();