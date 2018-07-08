<template>
  <v-container grid-list-xs,sm,md,lg,xl>
    <canvas
      id="main-canvas"
      ref="canvas"
    ></canvas>
    <v-speed-dial
      v-model="fab"
      fixed
      bottom
      left
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        fab
        color="error"
      >
        <v-icon>edit</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="info"
        class="mb-3"
      >
        <v-icon>stop</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="info"
      >
        <v-icon>cached</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="info"
        @click="dialog=true"
      >
        <v-icon>more_horiz</v-icon>
      </v-btn>
    </v-speed-dial>
    <!-- TODO create a custom compenent for these settings -->
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline primary dark"
          primary-title
        >
          Thread Settings
        </v-card-title>
        <v-card-text>
          This will be where all the sweet configurations for your current thread can take place. Also,
          you will be able to select different threads and what not. Sick!
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
let userData = require('@/assets/reference/sketch-template.json')
export default {
  data () {
    return {
      // View data
      fab: false,
      dialog: false,
      transition: 'slide-y-reverse-transition',
      // Thread Spinner Data
      scene: userData.scenes[0], // load first scene for now TODO
      frameID: undefined // to be able to cancel animation
    }
  },
  methods: {
    frame () {
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
    }
  },
  mounted () {
    this.$nextTick(function () {
      // initialize scene (must happen first)
      this.scene = Threads.initialize(this.$refs.canvas, this.scene)
      window.addEventListener('resize', this.setCanvasSize)
      this.setCanvasSize()
      // Start
      this.frame()
    })
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.frameID)
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
