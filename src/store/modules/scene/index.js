import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const state = undefined // should be loaded from either the template or firebase
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
