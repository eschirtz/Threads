import * as firebase from 'firebase'

export default {
  /**
   * Firebase Auth to create user,
   * then create new user in fb database with same key
   */
  signUp ({commit, dispatch}, payload) {
    commit('setLoading', true, {root: true})
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        response => {
          commit('setLoading', false, {root: true})
          const user = {
            id: response.user.uid,
            email: response.user.email,
            userName: payload.userName,
            scenes: []
          }
          commit('updateUser', user, {root: true}) // set user locally
          dispatch('saveUser', user) // save to fb
        })
      .catch(
        error => {
          commit('setLoading', false, {root: true})
          commit('setError', error, {root: true})
        }
      )
  },
  /**
   * Signs user in with fb Auth,
   * then fetches user data from database
   */
  signIn ({commit, dispatch}, payload) {
    commit('setLoading', true, {root: true})
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        response => {
          commit('setLoading', false, {root: true})
          // auth state has changed, so listener will be fired from main.js,
          // to fetch user data
        })
      .catch(
        error => {
          commit('setLoading', false, {root: true})
          commit('setError', error, {root: true})
        }
      )
  },
  /**
   * Saves local user data to fb database
   * payload should have the fields wanted to update
   * Must have an id
   */
  saveUser ({commit, state}) {
    commit('setLoading', true, {root: true})
    firebase.database().ref('/users/' + state.id).update(state)
      .then((response) => {
        commit('setLoading', false, {root: true})
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        commit('setError', error, {root: true})
      })
  },
  /**
   * Pulls down user data from the fb database,
   * completely overwriting the local user state
   * takes one argument, the user id
   */
  fetchUser ({commit, state}, id) {
    commit('setLoading', true, {root: true})
    firebase.database().ref('/users/' + id).once('value')
      .then((response) => {
        commit('setLoading', false, {root: true})
        commit('updateUser', response.val(), {root: true})
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        commit('setError', error, {root: true})
      })
  },
  /**
   * Logs user out of firebase auth, and sets local
   * user state to an empty object
   */
  logout ({commit, dispatch}) {
    commit('unsetUser', {}, {root: true}) // null user info
    firebase.auth().signOut()
  }
}
