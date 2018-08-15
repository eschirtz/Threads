export default {
  userIsAuthenticated (state) {
    // If there is a unique id, there is a user
    if (state.user) {
      return state.user.id !== undefined && state.user.id !== null
    } else {
      return false
    }
  }
}
