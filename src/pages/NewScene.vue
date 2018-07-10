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
        v-for="control in controls"
        v-bind:key="control.name"
        fab
        dark
        small
        color="info"
        @click="control.action"
        style="cursor: pointer"
      >
        <v-icon>{{ control.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <ts-thread-settings
      :scene = "scene"
      @settingChanged = "updateSettings($event)"
    ></ts-thread-settings>
    </v-dialog>
  </v-container>
</template>

<script>
// modules
import * as Threads from '@/custom_modules/threads/threads.js'
// components
import TsThreadSettings from '@/components/ts-thread-settings.vue'
// globals
let userData = require('@/assets/reference/sketch-template.json')
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
          action: 'this.$methods.test'
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
    },
    updateSettings (setting) {
      this.scene.name = setting.value
    },
    test () {
      console.log('testing')
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
  },
  components: {
    TsThreadSettings
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
