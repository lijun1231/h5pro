/**
 * Created by Administrator on 2016/8/3.
 */
(function($){
    var Man = Backbone.Model.extend({
        initialize: function(){
            alert('Hey, you create me!');
            //初始化时绑定监听
            this.bind("change:name",function(){
                var name = this.get("name");
                alert("你改变了name属性为：" + name);
            });
        },
        defaults: {
            name:'张三',
            age: '38'
        },
        aboutMe: function(){
            return '我叫' + this.get('name') + ',今年' + this.get('age') + '岁';
        }
    });
    var man = new Man;
//触发绑定的change事件，alert。
    man.set({name:'the5fire'});

//触发绑定的change事件，alert。
    man.set({name:'the5fire.com'});
})(jQuery);