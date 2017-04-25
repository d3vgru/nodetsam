import * as types from '../mutation-types'

const state = {
  count: 0
}

const mutations = {
  [types.DECREMENT] (state) {
    state.count--
  },
  [types.INCREMENT] (state) {
    state.count++
  }
}

export default {
  state,
  mutations
}
