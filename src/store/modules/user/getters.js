export default {
  isAuthenticated (state) {
    // If there is an id, there is a user
    return state.id !== undefined && state.id !== null
  },
  scenes (state) {
    return state.scenes
  },
  unsavedData (state) {
    return state.unsavedData
  }
}
