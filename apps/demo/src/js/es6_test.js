/**
 * Created by Administrator on 2016/10/25.
 */
var length=10;
function fn(){
    console.log(this.length);
}
var obj={
    length:5,
    cc:function(fn){
        this.fn();//5
        arguments[0]();//1
    }
};
obj.fn=fn;