export default {
  toggleFullScreen (fullscreen, element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    console.log("I'm trying")
  }
}
