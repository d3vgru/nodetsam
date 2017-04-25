// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false

sync(store, router) // Install vuex-router-sync

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
