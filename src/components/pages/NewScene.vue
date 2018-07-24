<template>
  <v-container grid-list-xs,sm,md,lg,xl>
    <canvas
      id="main-canvas"
      ref="canvas"
    ></canvas>
    <v-bottom-sheet
      v-model="sheet"
    >
      <v-btn
        slot="activator"
        color="error"
        fixed
        bottom
        right
        small
        fab
        outline
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <!-- <v-btn
        color="error"
        fixed
        right
        small
        fab
        outline
        class="mt-2"
        @click="sheet=false"
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn> -->
      <!-- <ts-thread-settings></ts-thread-settings> -->
      <ts-settings-sheet></ts-settings-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
import TsThreadSettings from '@/components/widgets/ts-thread-settings'
import TsSettingsSheet from '@/components/widgets/ts-settings-sheet'
export default {
  data () {
    return {
      // View data
      fab: false,
      dialog: false,
      sheet: false,
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
        Threads.Controller.terminate(this.$refs.canvas)
      } else {
        // Re-attatch listeners when no GUI
        Threads.Controller.initialize(this.$refs.canvas)
      }
    }
  },
  components: {
    TsThreadSettings,
    TsSettingsSheet
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
