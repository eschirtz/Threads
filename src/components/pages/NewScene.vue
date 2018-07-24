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
        @click="fabControl(control.action, control.payload, control.vuex)"
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
    <ts-settings></ts-settings>
    </v-dialog>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
import TsSettings from '@/components/widgets/ts-settings'
export default {
  data () {
    return {
      // View data
      fab: false,
      dialog: false,
      transition: 'slide-y-reverse-transition',
      frameID: undefined // to be able to cancel animation
    }
  },
  computed: {
    scene () {
      return this.$store.state.scene
    },
    controls () {
      const toggleBuildMode =
      {
        tooltip: 'rotate',
        icon: 'grid_off',
        action: 'scene/toggleBuildMode',
        vuex: true
      }
      toggleBuildMode.icon =
        this.scene.settings.buildMode ? 'grid_off' : 'grid_on'
      const playPause =
      {
        tooltip: 'play / pause',
        icon: '',
        action: 'scene/playPause',
        vuex: true
      }
      playPause.icon =
        this.scene.paused ? 'play_arrow' : 'pause'
      const settings = {
        tooltip: 'more',
        icon: 'settings',
        action: 'settings',
        vuex: false
      }
      const controlList = [
        toggleBuildMode,
        playPause,
        settings
      ]
      return controlList
    }
  },
  methods: {
    fabControl (action, payload, vuex) {
      if (vuex) {
        this.$store.commit(action, payload)
      } else {
        switch (action) {
          case 'settings':
            this.dialog = true
            break
          default:
        }
      }
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
  },
  watch: {
    dialog: function (guiUp) {
      if (guiUp) {
        // Remove listeners to avoid conflict with GUI
        console.log(this.$refs.canvas)
        Threads.Controller.terminate(this.$refs.canvas)
      } else {
        // Re-attatch listeners when no GUI
        Threads.Controller.initialize(this.$refs.canvas)
      }
    }
  },
  components: {
    TsSettings
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
