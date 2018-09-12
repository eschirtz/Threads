export default {
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
  },
  deleteSceneByID (state, id) {
    const scenes = state.scenes
    const sceneToDelete = scenes.find((scene) => {
      return scene.id === id
    })
    const i = scenes.indexOf(sceneToDelete)
    scenes.splice(i, 1)
  },
  setUsername (state, payload) {
    state.userName = payload
  }
}
