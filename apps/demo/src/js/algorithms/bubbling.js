/**
 * Created by Administrator on 2016/10/25.
 */
define(function(){
    var bubbling=(a)=>{
        for (var i = a.length; i > 0; i--) {//比较的次数
            for (var j = 0; j < i; j++) {
                if (a[j] > a[j + 1]) {
                    a[j]=a[j]+a[j+1];
                    a[j+1]=a[j]-a[j+1];
                    a[j]=a[j]-a[j+1];
                }
            }
        }
        return a;
    };
    return bubbling;
});