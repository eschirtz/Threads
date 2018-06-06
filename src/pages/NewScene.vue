<template>
  <v-container grid-list-xs,sm,md,lg,xl>
    <canvas id="main-canvas" ref="canvas" @click="canvasClick"></canvas>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
// TODO Import user data via firebase
let userData = require('@/assets/reference/sketch-template.json')
export default {
  data () {
    return {
      scene: userData.scenes[0] // load first scene
    }
  },
  methods: {
    canvasClick (event) {
      console.log(event)
      Threads.addPoint(this.scene, event.clientX, event.clientY)
      Threads.render(this.scene)
    },
    // Make canvas fill screen
    setCanvasSize () {
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
      Threads.render(this.scene) // re-render
    }
  },
  mounted () {
    this.$nextTick(function () {
      // initialize scene (must happen first)
      this.scene = Threads.initialize(this.$refs.canvas, this.scene)
      // Set up DOM
      window.addEventListener('resize', this.setCanvasSize)
      this.setCanvasSize()
    })
  },
  beforeDestroy () {
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
