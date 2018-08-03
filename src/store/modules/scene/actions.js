import * as firebase from 'firebase'

export default {
  storeNew ({commit, state, dispatch}) {
    commit('setLoading', true, {root: true})
    firebase.database().ref('/scenes').push({name: 'temp-scene'})
      .then((response) => {
        commit('setLoading', false, {root: true})
        commit('setID', response.key)
        // attatch scene id and name to user
        commit('user/addScene', {
          id: response.key,
          name: state.name
        },
        {root: true}
        )
        dispatch('store', response.key)
      })
  },
  store ({commit, state, rootState, dispatch}, id) {
    commit('setLoading', true, {root: true})
    commit('setCreatorID', rootState.user.id) // attatch the user id to scene
    firebase.database().ref('/scenes/' + id).update(state)
      .then((response) => {
        commit('setLoading', false, {root: true})
        dispatch('user/updateUserData', rootState.user, {root: true}) // update user in fb
      })
      .catch((error) => {
        commit('setLoading', false, {root: true})
        console.log(error)
      })
  },
  load ({commit, state}, payload) {
    // overwrite scene state with loaded scene
    firebase.database().ref('scenes/' + payload.id).once('value')
      .then((data) => {
        commit('setScene', data.val(), {root: true})
      })
      .catch((error) => {
        console.log(error)
      }
      )
  }
}
