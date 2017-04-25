import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var load = component => () => System.import(`components/${component}.vue`)
export { load }

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: load('Index')
    }
  ]
})
