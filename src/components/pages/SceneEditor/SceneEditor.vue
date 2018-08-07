<template>
  <v-container grid-list-xs,sm,md,lg,xl>
    <canvas
      id="main-canvas"
      ref="canvas"
    ></canvas>
    <v-bottom-sheet
      v-model="sheet"
      inset
    >
      <v-btn
        slot="activator"
        color="primary"
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
import BlankScene from '@/custom_modules/threads/default-scene.js'
import TsSettingsSheet from './ts-settings-sheet'
export default {
  data () {
    return {
      // View data
      sheet: false,
      frameId: undefined // used to cancel animation
    }
  },
  computed: {
    scene () {
      return this.$store.state.scene
    },
    sceneId () {
      return this.$route.params.id
    }
  },
  methods: {
    frame () {
      Threads.Controller.executeTimerBasedControls()
      Threads.update()
      Threads.render(this.scene, this.$refs.canvas)
      this.frameId = window.requestAnimationFrame(this.frame)
    },
    setCanvasSize () {
      Threads.setCanvasSize(this.$refs.canvas)
    },
    loadNewScene (id) {
      this.$store.commit('setScene', BlankScene()) // draw blank scene everytime
      if (id !== undefined && id !== 'undefined') {
        // if there is a scene, load that
        this.$store.dispatch('scene/load', { id: id })
      }
    }
  },
  mounted () {
    this.loadNewScene(this.$route.params.id)
    Threads.initialize(this.$refs.canvas, this.scene)
    window.addEventListener('resize', this.setCanvasSize)
    this.frame() // kick off animation
  },
  beforeDestroy () {
    Threads.Controller.terminate(this.$refs.canvas)
    window.cancelAnimationFrame(this.frameId)
    window.removeEventListener('resize', this.setCanvasSize)
  },
  watch: {
    sheet: function (sheetIsUp) {
      if (sheetIsUp) {
        // Remove listeners to avoid conflict with GUI
        Threads.Controller.terminate(this.$refs.canvas)
      } else {
        // Re-attatch listeners when no GUI
        Threads.Controller.initialize(this.$refs.canvas)
      }
    },
    sceneId: function (id) {
      this.loadNewScene(id) // if the scene id changes, load the new scene
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
