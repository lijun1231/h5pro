/**
 * Created by Administrator on 2016/8/3.
 */
var AppRouter = Backbone.Router.extend({

    routes: {
        "posts/:id" : "getPost",
        "download/*path": "downloadFile",
        ":route/:action": "loadView",
        "manual": "manual",
        "*actions" : "defaultRoute"
    },

    getPost: function(id) {
        alert("getPost:"+id);
    },

    downloadFile: function( path ){
        alert("downloadFile:"+path); // user/images/hey.gif
    },
    loadView: function( route, action ){
        alert("loadView:"+route + "_" + action); // dashboard_graph
    },
    manual: function() {
        alert("call manual");
        app_router.navigate("/posts/" + 404, {trigger: true, replace: true});
    },
    defaultRoute : function(actions){
        alert("defaultRoute:"+actions);
    }

});

var app_router = new AppRouter;
Backbone.history.start();