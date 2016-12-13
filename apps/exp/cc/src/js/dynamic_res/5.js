/**
 * Created by Administrator on 2016/8/3.
 */
var Man = Backbone.Model.extend({
    url:urls[1]+"?a=1&b=1",
    initialize: function(){
        alert('Hey, you create me!');
        //初始化时绑定监听
        this.bind("change:name",function(){
            var name = this.get("name");
            alert("你改变了name属性为：" + name);
        });
        this.bind("change:name",function(){
            var name = this.get("name");
            alert("你改变了name属性为1：" + name);
        });
        this.bind("error",function(model,error){
            alert(error);
        });
    },
    defaults: {
        name:'张三',
        age: '38',
        uid:oUserinfo.uid,
        wid:oUserinfo.wid,
        openid:oUserinfo.openid,
        unid:oUserinfo.unid
    },
    validate:function(attributes){
        if(attributes.name == '') {
            return "name不能为空！";
        }
    },
    aboutMe: function(){
        return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
    }
});
var man = new Man;
man.set({name:'the5fire'});
//会发送POST到模型对应的url，数据格式为json{"name":"the5fire","age":38}
//man.save();

//然后接着就是从服务器端获取数据使用方法fetch([options])
var man1 = new Man;
//第一种情况，如果直接使用fetch方法，
//那么他会发送get请求到你model的url中，
//你在服务器端可以通过判断是get还是post来进行对应的操作。
man1.fetch();
//第二种情况，在fetch中加入参数，如下：
man1.fetch({url:urls[1]});
//这样，就会发送get请求到/getmans/这个url中，
//服务器返回的结果样式应该是对应的json格式数据，同save时POST过去的格式。

//不过接受服务器端返回的数据方法是这样的：
//man1.save();
man1.fetch({
    url:urls[1],
    success:function(model,response){
        alert('success');
        //model为获取到的数据
        alert(model.get('name'));
    },error:function(){
        //当返回格式不正确或者是非json数据时，会执行此方法
        alert('error');
    }
});