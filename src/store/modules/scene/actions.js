import * as firebase from 'firebase'
// import * as Threads from '@/custom_modules/threads/threads.js'

export default {
  save ({commit, state, rootState}) {
    commit('setLoading', true, {root: true})
    commit('setCreatorID', rootState.user.uid)
    firebase.database().ref('scenes').push(state)
      .then((response) => {
        console.log(response)
        commit('setLoading', false, {root: true})
        commit('user/addScene', {
          id: response.key,
          name: state.name
        },
        {root: true}
        )
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
