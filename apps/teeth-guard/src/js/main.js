//创建时间：2016年8月15日 09:13:57
//创建人：李君
//说明：首页
var device_id = 'ACA21362C643';
var date = '20170314';
var data = {
    "status": 1,//0调用失败，1调用成功，2参数错误
    "message": null,//请求附加信息
    "data": {
        "device_id": "abcdefg",//设备ID
        "date": "2017-01-01",//数据对应的日期
        "rate": 5,//当日总体质量评分，0.0~5.0
        "morning": {
            "duration": '80',//刷牙持续时长，单位秒
            "quality": 3.5,//上午的刷牙质量评分，0.0~5.0
            "teeth": {//每颗牙齿的刷牙质量评分，0.0~5.0，目前模型精确不到这个程度，可以根据刷牙大的区域设定为统一的数值                
                "t1": 1.0,
                "t2": 1.0,
                "t3": 1.0,
                "t4": 2.0,
                "t5": 4.0,
                "t6": 5.0,
                "t7": 3.0,
                "t8": 4.0,
                "t9": 4.5,
                "t10": 3.0,
                "t11": 4.0,
                "t12": 5.0,
                "t13": 3.0,
                "t14": 5.0,
                "t15": 3.0,
                "t16": 3.0,
                "t17": 3.0,
                "t18": 4.0,
                "t19": 4.0,
                "t20": 5.0,
            }
        },
        "night": {
            "duration": 300,
            "quality": 3.2,
            "teeth": {
                "t1": 1.0,
                "t2": 1.0,
                "t3": 1.0,
                "t4": 4.0,
                "t5": 5.0,
                "t6": 1.0,
                "t7": 3.0,
                "t8": 1.0,
                "t9": 1.0,
                "t10": 1.0,
                "t11": 4.0,
                "t12": 4.0,
                "t13": 4.0,
                "t14": 5.0,
                "t15": 1.0,
                "t16": 4.0,
                "t17": 5.0,
                "t18": 5.0,
                "t19": 3.0,
                "t20": 5.0,
            }
        }
    }
}
!function(){
    var me=j_m.currPage;
    me.hook(function(page) {
        var vm = me.vm;
        console.log(page);
        var page = j_m.cont.firstChild;
        console.log(page);
        if (!vm) {
            vm=me.vm=new Vue({
                el: page,
                data:{
                    device_id: Util.getUrlval('device_id'),//设备ID
                    date: Util.getUrlval('date'),//数据对应的日期
                    rate: 5,// 当日总体质量评分，0.0~5.0
                    teethQuality: {
                        morning: {
                            duration: null,
                            quality: null,
                            teeth: null,
                        },
                        night: {
                            duration: null,
                            quality: null,
                            teeth: null,
                        },
                    }
                },
                computed: {
                    // timePercent: function () {
                    //     return 
                    // }
                },
                mounted:function(){
                    page = j_m.cont.firstChild;
                    console.log(page);
                    Junb.addClass(page, 'ready');
                    j_m.compilePage();
                    this.freshData();
                    setTimeout(function(){
                        j_m.compilePage();
                        console.log(me);
                        console.log(me[0].className);
                    },100);
                },
                methods:{
                    search:function(){
                        j_m.changeHash('list/keyword='+encodeURIComponent(vm.keyword.trim()));
                    },
                    freshData:function(){
                        var that = this;
                        Junb.ajax({
                            url:oUserinfo.addr.interface,
                            type:"get",
                            paras:{
                                device_id: Util.getUrlval('device_id'),
                                date: Util.getUrlval('date'),
                            },
                            callback:function(data){
                                console.log(data);
                                that.teethQuality = data.data;
                                console.log(that);

                            }
                        });
                        console.log(this);
                        // this.teethQuality.morning = data.data.morning;
                        // this.teethQuality.night = data.data.night;
                    },
                    getTransp: function (v) {
                        return v >= 5 ? 1 : (+v / 5).toFixed(1);
                    },
                    getTimePercent: function (v, max) {
                        if (v && v > 0) {
                            return v > max ? 360 : v / max * 360;
                        } else {
                            return 0;
                        }
                    },
                },
                filters: {
                    formatTime: function(seconds) {
                        if (seconds && !isNaN(+seconds)) {
                            return `${~~(seconds / 60)}:${seconds % 60} `;
                        } else {
                            return '-';
                        }
                    }
                }
            });
        }
    });
}();