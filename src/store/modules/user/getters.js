export default {
  isAuthenticated (state) {
    // If there is a unique id, there is a user
    return state.id !== undefined && state.id !== null
  },
  scenes (state) {
    return state.scenes
  }
}
