import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

import * as actions from './actions'
import * as getters from './getters'

import counter from './modules/counter'

// TODO load all locales dynamically
import translationsEn from '../../../../common/i18n/en.json'

Vue.use(Vuex)

let store = new Vuex.Store({
  actions,
  getters,
  modules: {
    counter
  }
})

Vue.use(vuexI18n.plugin, store) // Install Vuex I18n plugin

// TODO override replace function to use {{}} like mashpie/i18n-node
// TODO set up aliases so client and instance use same method name __
// TODO register all loaded locales automatically
Vue.i18n.add('en', translationsEn)
Vue.i18n.fallback('en')

export default store
