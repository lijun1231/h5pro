var Home=Vue.extend({template:"#home",data:function(){return{msg:"Hello, vue router!"}}}),About=Vue.extend({template:"#about"}),router=new VueRouter;router.map({"/home":{component:Home},"/about":{component:About}}),router.redirect({"/":"/home"});var App=Vue.extend({});router.start(App,"#app");