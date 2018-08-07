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
  setId (state, id) {
    state.id = id
  },
  addScene (state, payload) {
    if (state.scenes) {
      state.scenes.push(payload)
    } else {
      state.scenes = [payload]
    }
  },
  setScene (state, payload) {
    let scene = state.scenes.find((el) => {
      return el.id === payload.id
    })
    scene.name = payload.name
    scene.id = payload.id
  }
}
