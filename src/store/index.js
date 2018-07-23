import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import scene from './modules/scene'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    scene
  },
  strict: process.env.NODE_ENV !== 'production'
})
