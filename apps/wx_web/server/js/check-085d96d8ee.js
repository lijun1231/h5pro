var VM={};!function(){var e=j_m.currPage;e.hook(function(){var t=$(j_m.currPage[0]),s=e.vm;s?s.sendPhoneCode():(s=e.vm=new Vue({el:t[0],data:{v:{user_name:"",name_able:!0,user_email:"",mobile:"",user_units:"",user_duty:"",user_application:"",role_list:[],role_list_sel:""}},ready:function(){Junb.addClass(e[0],"ready"),$("#j-body").show(),j_m.compilePage(),setTimeout(function(){j_m.compilePage()},100)},set:function(e){},methods:{toggleTag:function(e,t){var s=this.v.role_list,r=[];this.getItmById("id",s,e,function(e){e.c=!e.c});for(var a=0;a<s.length;a++)s[a].c&&r.push(s[a].id);this.v.role_list_sel=r.toString()},fnSub:function(e){$.ajax({url:"http://www.sooneus.tv/wechat_web/index.php?d=base&c=admin_Register&m=ajax_saveRegUserInfo",type:"post",data:{user_name:s.v.user_name,user_email:s.v.user_email,mobile:s.v.mobile,user_units:s.v.user_units,user_duty:s.v.user_duty,role_list:s.v.role_list_sel,secret:oUserinfo.secret},dataType:"json",success:function(e){0===+e.errcode?Util.Alert("您已审核完毕"):+e.errcode&&Util.Alert("操作超时或其他管理员已操作")}})},getItmById:function(e,t,s,r){for(var a=0;a<t.length;a++)if(s==t[a][e])return r&&r(t[a]),!0;return!1}}}),$.ajax({url:"http://www.sooneus.tv/wechat_web/index.php?d=base&c=admin_Register&m=ajax_getRegUserInfo",type:"post",data:{secret:oUserinfo.secret},dataType:"json",success:function(e){if(0===+e.errcode){s.v.user_name=e.data.user_name,s.v.user_email=e.data.user_email,s.v.mobile=e.data.mobile,s.v.user_units=e.data.user_units,s.v.user_duty=e.data.user_duty,s.v.user_application=e.data.user_application,s.v.role_list=e.data.role_list;for(var t=s.v.role_list,r=0;r<t.length;r++)s.$set("v.role_list["+r+']["c"]',!1)}else+e.errcode&&Util.Alert("身份非法")}}))})}();