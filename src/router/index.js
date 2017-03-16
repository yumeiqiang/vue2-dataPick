import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/shop/index'
    },
    {
      path:'/home',
      component(resolve){
        require(['page/search/location.vue'],resolve)
      }
    },
    {
      path:'/time',
      component(resolve){
        require(['components/Hello.vue'],resolve)
      }
    },
  ]
})
