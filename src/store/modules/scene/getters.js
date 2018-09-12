export default {
  activeThread (state) {
    if (state.activeThread === undefined || state.activeThread === null) {
      return undefined
    }
    const activeThreadIndex = state.activeThread
    return state.threads[activeThreadIndex]
  },
  imageRequested (state) {
    return state.imageRequested
  }
}
