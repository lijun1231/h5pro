$(function() {
    // chrome.browserAction.onClicked.addListener(function(tab) {
    //     // No tabs or host permissions needed!
    //     //console.log('Turning ' + tab.url + ' red!');
    //     chrome.tabs.executeScript({
    //         code: 'console.log("plugins clicked");document.body.style.backgroundColor="red"'
    //     });
    // });
    var o = {
        cc: 'cc',
        timer: 0
    };
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.extension.onMessage.addListener(function(req,sender,res){
            console.log(sender.tab?sender.tab.url:"no tab");
            if(req.greeting==="hello"){
                res({reply:req.greeting+" world"});
            }else if(req.greeting="jdclick"){
                o.c="c";
                o.timer+=1;
                res({reply:o});
            }
        });
    });
});