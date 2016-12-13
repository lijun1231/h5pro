/**
 * Created by jun.li on 16/8/7.
 */
require.config({
    baseUrl:'js/mod',
    paths:{
        "Junb":"/h5pro/pub/static/js/Junb-1.2.2.js",
        "jquery":"/h5pro/pub/static/js/jquery",
        "underscore":"../underscore",
        "backbone":"../backbone"
    },
    shim:{
        'Junb':{
            exports: 'J'
        },
        'underscore':{
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        '2':{
            exports:'_'
        }
    }
});
define(function(){
    require(["Junb","jquery","underscore","backbone","lib","index","1","2"],function(a){
        console.log(a);
        console.log(arguments);
    });
});