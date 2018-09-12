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
        dispatch('saveState')
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.error(error)
      })
  },
  /**
   * Stores current state in firebase database
   */
  saveState ({state, commit, rootState, dispatch}) {
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
        dispatch('user/saveState', undefined, {root: true}) // update user in fb
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.error(error)
      })
  },
  fetchState ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      // overwrite scene state with loaded scene
      firebase.database().ref('scenes/' + payload.id).once('value')
        .then((data) => {
          commit('setScene', data.val(), {root: true})
          resolve() // resolve the promise
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /**
   * Deletes the scene specified by id
   * @param  {[type]} commit  [description]
   * @param  {[type]} id [description]
   * @return {[type]}         [description]
   */
  deleteSceneByID ({rootState, commit}, id) {
    commit('setLoading', true, {root: true})
    firebase.database().ref('/scenes/' + id).remove()
      .then((response) => {
        // TODO use fb funcitons to auto remove references
        return firebase.database().ref('/users/' + rootState.user.id + '/scenes/').orderByChild('id').equalTo(id).once('value')
      })
      .then((snapshot) => {
        snapshot.forEach(function (child) {
          child.ref.remove()
          commit('user/deleteSceneByID', id, {root: true})
        })
        commit('setLoading', false, {root: true})
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        commit('setError', error, {root: true})
      })
  }
}
