export default {
  activeThread (state) {
    if (!state.activeThread) { return undefined }
    const activeThreadIndex = state.activeThread
    return state.threads[activeThreadIndex]
  }
}
