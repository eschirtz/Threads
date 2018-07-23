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
      style="cursor: pointer"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        fab
        color="error"
        class="mt-2"
      >
        <v-icon>edit</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        @click="addPointTest"
        v-for="control in controls"
        v-bind:key="control.name"
        fab
        dark
        small
        color="info"
        style="cursor: pointer"
      >
        <v-icon>{{ control.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <v-card>
      hello
    </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
export default {
  data () {
    return {
      // View data
      fab: false,
      dialog: false,
      transition: 'slide-y-reverse-transition',
      controls: {
        playPause: {
          name: 'pause / pause',
          icon: 'pause',
          action: ''
        },
        rotate: {
          name: 'rotate',
          icon: 'cached',
          action: ''
        },
        more: {
          name: 'more settings',
          icon: 'settings',
          action: ''
        }
      },
      // Thread Spinner Data
      // scene: userData.scenes[0], // load first scene for now TODO
      frameID: undefined // to be able to cancel animation
    }
  },
  calculated: {
    scene () {
      return this.$store.state.scene
    }
  },
  methods: {
    addPointTest () {
      this.$store.commit('scene/addPoint', {x: 100, y: 200})
    },
    frame () {
      Threads.Controller.executeTimerBasedControls()
      // Threads.update(this.scene)
      this.$store.commit('scene/update')
      Threads.render(this.scene, this.$refs.canvas)
      this.frameID = window.requestAnimationFrame(this.frame)
    },
    setCanvasSize () {
      // Fill screen with canvas
      this.$refs.canvas.width = window.innerWidth
      this.$refs.canvas.height = window.innerHeight
      this.$store.commit('scene/setSize', {
        width: window.innerWidth, height: window.innerHeight
      })
      Threads.render(this.scene, this.$refs.canvas) // re-render
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.scene = this.$store.state.scene
      // initialize scene (must happen first)
      Threads.initialize(this.$refs.canvas, this.scene)
      window.addEventListener('resize', this.setCanvasSize)
      this.setCanvasSize()
      // Start
      this.frame()
    })
  },
  beforeDestroy () {
    Threads.Controller.terminate(this.$refs.canvas)
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
