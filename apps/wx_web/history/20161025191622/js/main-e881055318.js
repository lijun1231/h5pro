!function(){var e=j_m.currPage;e.hook(function(a){var t=e.vm,o=$(a[0]),i=(o.find("#main-hd-list-slider"),o.find("#header-swiper"));if(t)t.query_tag_id=j_m.cateHash.tag_id,t.nav.mod=0,t.nav.order=!1,t.list=null,t.hasMore=!0,t.pageIndex=0,t.loadVideoList();else{t=e.vm=new Vue({el:o[0],data:{list:[],pList:[],atags:[],query_tag_id:j_m.cateHash.tag_id,hd:{},hdl:[],nav:{mod:0,order:!1},order_by:0,keyword:"",hasMore:!0,pageIndex:1,end:!1},ready:function(){Junb.addClass(e[0],"ready"),j_m.compilePage(),setTimeout(function(){j_m.compilePage()},100)},methods:{search:function(){j_m.changeHash("list/keyword="+encodeURIComponent(t.keyword.trim()))},switchNav:function(e){t.keyword="",t.nav.mod=e},togOrder:function(){t.nav.order=!t.nav.order},orderBy:function(e){var a=$(e.target).attr("data-order");t.order_by=a,t.nav.order=!1},loadVideoList:function(){t.pageIndex++,Util.callService({url:oUserinfo.addr["interface"]+"/index.php?d=account&c=video&m=getVideoList",type:"post",paras:{p:t.pageIndex,n:"4",tag_id:t.query_tag_id},callback:function(a){0!=a.data.length?(1==t.pageIndex&&(t.list=a.data.slice(5)),t.list=e.vm.list.concat(a.data),setTimeout(function(){j_m.compilePage(),oDocinfo.sh=document.documentElement.scrollHeight,$(window).on("scroll",t.loadByScroll)})):t.hasMore=!1}})},loadByScroll:function(){!j_m.cateHash.usr&&Util.isPageEnd()&&(t.end=!0,$(window).off("scroll",t.loadByScroll),t.loadVideoList())}}});var d=o.find("#main-header");setTimeout(function(){$("body").scrollTop(d.height()),d.show();new Swiper(i,{loop:!1,autoplay:!1,speed:1e3,slidesPerView:5,centeredSlides:!1,observer:!0})},500),t.loadVideoList()}Util.callService({url:oUserinfo.addr["interface"]+"/index.php?d=account&c=video&m=getTags",paras:{video_id:j_m.cateHash.video_id},callback:function(a){e.vm.atags=a.data,e.vm.cc=a.data.cc}}),Util.callService({url:oUserinfo.addr["interface"]+"/index.php?d=account&c=video&m=getVideoList",type:"post",paras:{p:"1",n:"5"},callback:function(a){e.vm.pList=a.data,e.vm.hd=e.vm.pList[0],e.vm.hdl=e.vm.pList.slice(1,5),setTimeout(function(){j_m.compilePage()})}}),!function(){var e=$("#j-footer-to");setTimeout(function(){j_m.cateHash.usr&&(e.attr("data-href","-usr"),e.addClass("on"))}),e.click(function(a){$(this).hasClass("on")?($(this).attr("data-href","-usr"),$(this).removeClass("on")):($(this).attr("data-href","^usr=u"),$(this).addClass("on")),Junb.drag(e[0])})}()})}();