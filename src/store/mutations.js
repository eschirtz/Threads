export default {
  setLoading (state, isLoading) {
    state.loading = isLoading // true or false
  },
  setError (state, error) {
    console.error(error)
    state.error = error
  },
  clearError (state) {
    state.error = undefined
  },
  setScene (state, scene) {
    state.scene = scene // overwrite scene state with new scene
  },
  /**
   * Updates usre properties that are different,
   * and leaves existing fields as is
   */
  updateUser (state, payload) {
    state.user = {
      ...state.user,
      ...payload
    }
  },
  /**
   * Completely overwrite the user state, set
   * to empty object if no payload
   */
  setUser (state, payload) {
    if (payload) {
      state.user = payload
    } else {
      state.user = {}
    }
  },
  /**
   * Set key user fields to undefined values
   * not overwriting entire object because that seems to
   * kill some reactive getters
   */
  unsetUser (state) {
    state.user = {}
  }
}
