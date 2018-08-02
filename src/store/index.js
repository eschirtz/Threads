import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import scene from './modules/scene'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    error: undefined
  },
  getters: {
    userIsAuthenticated (state) {
      // If there is a unique id, there is a user
      return state.user.id !== undefined && state.user.id !== null
    }
  },
  mutations: {
    setLoading (state, isLoading) {
      state.loading = isLoading // true or false
    },
    setError (state, error) {
      console.log(error)
      state.error = error
    },
    clearError (state) {
      state.error = undefined
    },
    setScene (state, scene) {
      state.scene = scene // overwrite scene state with new scene
    },
    setUser (state, user) {
      state.user = user // overwrite the user
    }
  },
  modules: {
    user,
    scene
  },
  strict: process.env.NODE_ENV !== 'production'
})
