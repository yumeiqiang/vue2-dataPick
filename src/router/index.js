import Vue from 'vue'
import Router from 'vue-router'
import  store from '../store'
Vue.use(Router)

const router=new Router({
  mode:'history',
  routes: [
    {
      path: '/home',
      redirect:'shop/index'
    },
    {
      path:'/',
      meta: {
        requireAuth: true, //表示此处需登录才能进行跳转
      },
      component(resolve){
        require(['page/search/location.vue'],resolve)
      }
    },
    {
      path:'/login',
      component(resolve){
        require(['page/search/login.vue'],resolve)
      }
    },
    {
      path:'/list',
      component(resolve){
        require(['page/search/searchList.vue'],resolve)
      }
    },
    {
      path:'/hotel',
      component(resolve){
        require(['page/search/hotel_detail.vue'],resolve)
      }
    },
  ]
})
// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit('TOKEN', JSON.parse(window.localStorage.getItem('token')))
}
if (window.localStorage.getItem('infor')) {
  store.commit('CITY', JSON.parse(window.localStorage.getItem('infor')))
}
router.beforeEach((to, from, next) => {
  console.log(store.state.Auth)
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.Auth.token) {
      next();
    }
    else {
      console.log(store.state.Auth)
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router;
