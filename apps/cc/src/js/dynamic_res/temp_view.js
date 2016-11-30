/**
 * Created by Administrator on 2016/8/4.
 */
(function($){
    var Person = Backbone.Model.extend({
        defaults: {
            name: '佚名',
            age: '104',
            city:"北京"
        },
        initialize:function(){
            this.set({code:'1'});
        }
    });
    var Pool=Backbone.Collection.extend({models:Person});
    var SearchView=Backbone.View.extend({
        initialize: function () {
            console.log('initialize');
            _.bindAll(this, 'render', 'add', 'appendItem');
            this.collection=new Pool();
            this.collection.bind('add', this.appendItem);
            this.collection.bind('change:code',this.render);
            this.counter=0;
            this.t1=$(this.el).find('#search-template');
            this._t1=$(this.el).find('#--search-template');
            this.baseData=arguments[0]['baseData'];
        },
        events: {
            'click #search-button': 'add'
        },
        render: function (context) {
            console.log("render");
            var template = _.template(this._t1.html());
            this.t1.html(template(context));
        },
        add: function () {
            var id=this.counter++;
            var p=new Person(this.baseData[id]);
            p.fetch({
                url:urls[1],
                success:function(data){
                    console.log(data);
                }
            });
            p.set({
                id:id,
                code:Junb.createRandomAlphaNum(5)
            });
            this.collection.add(p);
        },
        appendItem: function () {
            var me=this;
            this.render({
                search_label:"hallo backbone!+",
                list:(function(){
                    var arr=[];
                    me.collection.each(function(item){
                        arr.push('<li>'+item.get("id")+'-'+item.get("name")+'-'+item.get("age")+'-'+item.get("city")+'-'+item.get("code")+'</li>');
                    });
                    return arr;
                })()
            });
            //$('ul',this.t).append('<li>'+item.get("name")+'-'+item.get("age")+'-'+item.get("city")+'-'+item.get("counter")+'</li>');
        }
    });
    !function(){
        Junb.ajax({
            url:'person.json',
            type:'post',
            callback:function(data){
                console.log(data);
                var searchView=new SearchView({el:$("#main-box"),baseData:data.data});
                searchView.render({search_label:"hallo backbone!",list:[]});
            }
        });
    }();
})(jQuery);