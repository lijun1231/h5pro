Vue.directive("demo",{deep:!0,twoWay:!0,bind:function(){this.handler=function(){this.set(this.el.value)}.bind(this),this.el.addEventListener("input",this.handler)},update:function(e,t){this.el.innerHTML="name - "+this.name+"<br>expression - "+this.expression+"<br>arg - "+this.arg+"<br>modifiers - "+JSON.stringify(this.modifiers)+"<br>value - "+JSON.stringify(e)},unbind:function(){this.el.removeEventListener("input",this.handler)}}),Vue.directive("demo-inp",{deep:!0,twoWay:!0,bind:function(){this.handler=function(){this.set(this.el.value)}.bind(this),this.el.addEventListener("input",this.handler)},update:function(e,t){},unbind:function(){this.el.removeEventListener("input",this.handler)}}),Vue.directive("style",function(e){}),Vue.directive("example",{params:["start","end"],deep:!0,bind:function(e){this.txt=this.el.innerHTML,this.el.addEventListener("click",this.extendClick.bind(this),!1)},extendClick:function(){Junb.toggleClass(this.el,"on")},paramWatchers:{start:function(e,t){this.update()}},update:function(e,t){this.el.closest(".itm").style.display="block",this.el.innerHTML=this.params.start+this.txt+this.params.end},unbind:function(){this.el.removeEventListener("click",this.extendClick)}}),Vue.directive("example-cond",{bind:function(e){"close"===this.expression&&this.el.addEventListener("click",function(){this.el.closest(".itm").style.display="none"}.bind(this),!1)}}),Vue.directive("cover-pic",{update:function(e){this.el.style.background="url("+e+") no-repeat center center",this.el.style.backgroundSize="cover","close"===this.expression&&this.el.addEventListener("click",function(){this.el.closest(".itm").style.display="none"}.bind(this),!1)}}),Vue.directive("form-format",{bind:function(){this.formatHandler=function(){var e=this.el.value.trim(),t=!1;switch(this.expression){case"email":var i=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;i.test(e)||Util.Alert("请输入正确的邮箱");break;case"phone":t=function(){return/^(\d{3,4}\-)?\d{7,8}$/i.test(sPhone)?!0:/^0(([1-9]\d)|([3-9]\d{2}))\d{8}$/.test(sPhone)?!0:!!/^(400)\d{7}$/.test(sPhone)}(),t||Util.Alert("请输入正确的电话号码");break;case"mobile":t=function(){return!!/^1[3|4|5|8|7][0-9]\d{8}$/.test(e)}(),t||Util.Alert("请输入正确的手机号码")}}.bind(this),this.el.addEventListener("blur",this.formatHandler)}});