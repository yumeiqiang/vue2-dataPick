import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      redirect:'shop/index'
    },
    {
      path:'/',
      component(resolve){
        require(['page/search/location.vue'],resolve)
      }
    },
    {
      path:'/time',
      component(resolve){
        require(['components/calendar.vue'],resolve)
      }
    },
  ]
})
