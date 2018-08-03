// import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  id: undefined,
  email: undefined,
  userName: undefined,
  scenes: []
}

const getters = {
  scenes (state) {
    return state.scenes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
