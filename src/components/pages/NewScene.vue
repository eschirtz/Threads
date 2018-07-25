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
        fab
        outline
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <ts-settings-sheet></ts-settings-sheet>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
import TsSettingsSheet from '@/components/widgets/ts-settings-sheet'
export default {
  data () {
    return {
      // View data
      sheet: false,
      dialog: false,
      arrowControl: 'scene/updateThreadSpeed',
      frameID: undefined // to be able to cancel animation
    }
  },
  computed: {
    scene () {
      return this.$store.state.scene
    }
  },
  methods: {
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
