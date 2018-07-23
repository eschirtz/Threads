const state = {
  uid: '001',
  firstName: 'First',
  lastName: 'Last',
  scenes: {
    sceneid1: true,
    sceneid2: true
  }
}

const getters = {
  fullName (state) {
    return state.firstName + ' ' + state.lastName
  }
}

const mutations = {
  setName (state, payload) {
    state.firstName = payload.firstName || state.firstName
    state.lastName = payload.lastName || state.lastName
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
