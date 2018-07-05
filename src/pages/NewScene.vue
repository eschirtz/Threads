<template>
  <v-container grid-list-xs,sm,md,lg,xl>
    <canvas
      id="main-canvas"
      ref="canvas"
      @mousedown.left="mouse.down=true"
      @mouseup.left="mouse.down=false"
    ></canvas>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
// TODO Import user data via firebase
let userData = require('@/assets/reference/sketch-template.json')
export default {
  data () {
    return {
      scene: userData.scenes[0], // load first scene for now TODO
      frameID: undefined,
      mouse: {
        down: false,
        position: {
          x: 0, y: 0
        }
      }
    }
  },
  methods: {
    frame () {
      // if (this.mouse.down) {
      //   // Threads.addPoint(this.scene, this.mouse.position.x, this.mouse.position.y)
      // }
      Threads.Controller.executeTimerBasedControls()
      Threads.update(this.scene)
      Threads.render(this.scene, this.$refs.canvas)
      this.frameID = window.requestAnimationFrame(this.frame)
    },
    setCanvasSize () {
      // Fill screen with canvas
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
      this.scene.width = this.$refs.canvas.width // update the scene dimensions
      this.scene.height = this.$refs.canvas.height
      Threads.render(this.scene, this.$refs.canvas) // re-render
    },
    getMousePosition (event) {
      event.preventDefault()
      let eventDoc, doc, body
      event = event || window.event // IE-ism
      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      /* eslint-disable no-mixed-operators */
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document
        doc = eventDoc.documentElement
        body = eventDoc.body
        event.pageX = event.clientX +
            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            (doc && doc.clientLeft || body && body.clientLeft || 0)
        event.pageY = event.clientY +
            (doc && doc.scrollTop || body && body.scrollTop || 0) -
            (doc && doc.clientTop || body && body.clientTop || 0)
      }
      /* eslint-enable no-mixed-operators */
      this.mouse.position.x = event.pageX
      this.mouse.position.y = event.pageY
    }
  },
  mounted () {
    this.$nextTick(function () {
      // initialize scene (must happen first)
      this.scene = Threads.initialize(this.$refs.canvas, this.scene)
      // Add event listeners
      window.addEventListener('mousemove', this.getMousePosition)
      window.addEventListener('resize', this.setCanvasSize)
      this.setCanvasSize()
      // Start
      this.frame()
    })
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.frameID)
    window.removeEventListener('onmousemove', this.getMousePosition)
    window.removeEventListener('resize', this.setCanvasSize)
  }
}
</script>

<style scoped lang="css">
  canvas {
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    margin: 0;
    padding: 0;
  }
</style>
