import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  id: undefined,
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
