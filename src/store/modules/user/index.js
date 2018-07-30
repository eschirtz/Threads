// import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = {
  uid: undefined,
  email: undefined,
  userName: undefined,
  scenes: []
}

const getters = {
  userName (state) {
    return state.userName
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
