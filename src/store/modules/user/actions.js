import * as firebase from 'firebase'

export default {
  signUp ({commit, dispatch}, payload) {
    commit('setLoading', true, {root: true})
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        response => {
          commit('setLoading', false, {root: true})
          const user = response.user
          const newUser = {
            uid: user.uid,
            email: user.email,
            scenes: [] // new users have no scenes yet
          }
          dispatch('setUser', newUser)
        })
      .catch(
        error => {
          commit('setLoading', false, {root: true})
          commit('setError', error, {root: true})
        }
      )
  },
  signIn ({commit, dispatch}, payload) {
    commit('setLoading', true, {root: true})
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        response => {
          commit('setLoading', false, {root: true})
          const user = response.user
          const newUser = {
            uid: user.uid,
            email: user.email,
            scenes: [] // new users have no scenes yet
          }
          dispatch('setUser', newUser)
        })
      .catch(
        error => {
          commit('setLoading', false, {root: true})
          commit('setError', error, {root: true})
        }
      )
  },
  autoSignIn ({commit, dispatch}, payload) {
    dispatch('setUser', payload)
  },
  // Load all user data into the user state
  setUser ({commit}, payload) {
    commit('setUid', payload.uid)
    commit('setEmail', payload.email)
  },
  logout ({commit, dispatch}) {
    dispatch('setUser', {}) // null user info
    firebase.auth().signOut()
  }
}
