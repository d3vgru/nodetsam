require('es6-promise').polyfill()

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import Quasar from 'quasar'
import router from './router'

// TODO load all locales dynamically
import translationsEn from '../../../common/i18n/en.json'

Vue.use(Vuex) // Install Vuex state container

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
})

Vue.use(vuexI18n.plugin, store) // Install Vuex I18n plugin
// TODO override replace function to use {{}} like mashpie/i18n-node
// TODO set up aliases so client and instance use same method name __
// TODO register all loaded locales automatically
Vue.i18n.add('en', translationsEn)
Vue.i18n.fallback('en')

Vue.use(Quasar) // install quasar framework

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App'))
  })
})
