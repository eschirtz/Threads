import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  id: 1234, // temp id to have default state logged in
  email: undefined,
  userName: undefined,
  scenes: []
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
