// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// plugins
import 'plugins/screen'
/* eslint-disable no-new */
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
