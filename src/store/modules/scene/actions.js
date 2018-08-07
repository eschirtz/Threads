import * as firebase from 'firebase'

export default {
  /**
   * Adds a node for this new scene,
   * fetches id from fb, then hands
   * off to the store function
   */
  storeNew ({commit, state, dispatch}) {
    commit('setLoading', true, {root: true})
    firebase.database().ref('/scenes').push(false)
      .then((response) => {
        commit('setLoading', false, {root: true})
        const id = response.key
        // Update local state
        commit('setId', id)
        commit('user/addScene', {
          id: id,
          name: state.name
        }, {root: true})
        // Update firebase state
        dispatch('store')
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.error(error)
      })
  },
  /**
   * Stores current state in firebase database
   */
  store ({state, commit, rootState, dispatch}) {
    const id = state.id
    commit('setLoading', true, {root: true})
    commit('setCreatorId', rootState.user.id) // attatch the user id to scene
    commit('user/setScene', {
      id: id,
      name: state.name
    }, {root: true})
    firebase.database().ref('/scenes/' + id).update(state)
      .then((response) => {
        commit('setLoading', false, {root: true})
        dispatch('user/updateUserData', undefined, {root: true}) // update user in fb
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.error(error)
      })
  },
  load ({commit, state}, payload) {
    commit('setLoading', true, {root: true})
    // overwrite scene state with loaded scene
    firebase.database().ref('scenes/' + payload.id).once('value')
      .then((data) => {
        commit('setLoading', false, {root: true})
        commit('setScene', data.val(), {root: true})
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.error(error)
      }
      )
  }
}
