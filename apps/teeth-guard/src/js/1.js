/* 创建组件构造器  */
var Home = Vue.extend({
    template: '#home',
    data: function() {
        return {
            msg: 'Hello, vue router!'
        }
    }
})

var About = Vue.extend({
    template: '#about'
})

/* 创建路由器  */
var router = new VueRouter()
// router.beforeEach((to, from, next) => {
//     console.log(to.to.path);
// })
// router.afterEach((to, from, next) => {
//     console.log(to.to.path);
// })

/* 创建路由映射  */
router.map({
    '/home': {
        component: Home
    },
    '/about': {
        component: About
    }
})

router.redirect({
    '/': '/home'
})

/* 启动路由  */
var App = Vue.extend({})
router.start(App, '#app')
////////////////////////////////////////////////////////----------------以下是非必须项
//全局钩子