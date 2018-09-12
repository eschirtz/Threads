export default {
  /**
   * Global loading state
   * @param {Boolean} isLoading
   */
  setLoading (state, isLoading) {
    state.loading = isLoading
  },
  /**
   * Global error state
   * @param {[type]} error [description]
   */
  setError (state, error) {
    console.error(error)
    state.error = error
  },
  /**
   * Clears the global error
   * @param  {[type]} state
   */
  clearError (state) {
    state.error = undefined
  },
  setScene (state, scene) {
    state.scene = scene // overwrite scene state with new scene
  },
  /**
   * Updates user properties that are different,
   * and leaves existing fields as is
   */
  updateUser (state, payload) {
    // Creat user object to be able to format data before updating
    const user = { ...payload }
    // Explicitly push into an array to avoid undefined elements when fb keys are missing
    if (payload.scenes) {
      user.scenes = []
      payload.scenes.forEach((scene) => {
        user.scenes.push(scene)
      })
    }
    state.user = {
      ...state.user,
      ...user
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
