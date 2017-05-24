/**
 * Created by Administrator on 2016/10/27.
 */
(function(){
    function Foo () {
    	getName = function () {
    		alert(1);
    	};
    	return this;
    }
    Foo.getName = funciton () {
    	alert(2);
    };
    Foo.prototype.getName = function () {
    	alert('baidu' && 'google');
    };
    var getName = function () {
    	alert(4);
    };
    function getName () {
    	alert(5+1);
    }
    // 写出以下输出结果
    Foo.getName();
    getName();
    Foo().getName();
    getName();
    new Foo().getName();
    new new Foo().getName();
})();