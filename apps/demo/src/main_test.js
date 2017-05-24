/**
 * Created by Administrator on 2016/10/10.
 */
require.config({
    baseUrl: './js',
    paths: {
        "lib": 'Nice.lib-1.0.0',
        "Nice": 'Nice-1.0.0'
    },
    shim: {
        Nice: {
            exports: "_"
        },
        lib: {
            deps: ["Nice"],
            exports: "_lib"
        }
    }
});
require(["Nice", "lib", "algorithms/quick_sort", "algorithms/bubbling"], function (_, _lib, quickSort, bubbling) {
    console.log(arguments);
    //var arr=[9,9,8,7,12,3,45,76,10,2,125,0,-10];
    //console.log(quickSort((arr)));//快速排序
    //console.log(bubbling((arr)));//冒泡排序


});



