export default {
  setUsername (state, userName) {
    state.userName = userName
  },
  setEmail (state, email) {
    state.email = email
  },
  setScenes (state, scenes) {
    state.scenes = scenes || []
  },
  setUid (state, uid) {
    state.uid = uid
  },
  addScene (state, payload) {
    state.scenes.push(payload) // id, name, img
  }
}
