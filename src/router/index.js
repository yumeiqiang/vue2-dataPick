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
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
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
