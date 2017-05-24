$(function(){
    console.log('hello i am 1.js');
    var $con=$("#choose-version");
    var $itms=$con.find(".item:not(.disabled)");
    var $num=$("#buy-num");
    var $bt=$("#InitCartUrl");
    //chrome.extension.sendMessage({greeting: "jdclick"}, function(res) {
    //    console.log(res);
    //});
    chrome.extension.sendMessage({greeting: "hello"}, function(res) {
        console.log(11111111111111111);
        console.log(res);
    });
});