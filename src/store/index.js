import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import user from './modules/user'
import scene from './modules/scene'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: undefined
  },
  getters,
  mutations,
  modules: {
    user,
    scene
  }
  // strict: process.env.NODE_ENV !== 'production'
})
