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
    <!-- Loader -->
    <lottie
      v-if="loading"
      :options="loaderAnimationOptions"
      :height="100" :width="100"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    />
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
import BlankScene from '@/custom_modules/threads/default-scene.js'
import TsSettingsSheet from './ts-settings-sheet'
import loaderAnimation from '@/assets/animations/general-loader.json'
export default {
  data () {
    return {
      // View data
      sheet: false,
      frameId: undefined, // used to cancel animation
      lastTime: undefined, // used to calculated dt
      loaderAnimationOptions: {animationData: loaderAnimation},
      loading: true
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
    frame (time) {
      if (!this.lastTime) { this.lastTime = time }
      // calculated difference in time from last frame in seconds, in error default to assuming
      // animation is running at 60fps
      let dt = (time - this.lastTime) / 1000 || 1 / 60
      this.lastTime = time
      Threads.Controller.executeTimerBasedControls()
      Threads.update(dt)
      Threads.render(this.scene, this.$refs.canvas)
      this.frameId = window.requestAnimationFrame(this.frame)
    },
    setCanvasSize () {
      Threads.setCanvasSize(this.$refs.canvas)
    },
    initialize () {
      Threads.initialize(this.$refs.canvas, this.scene)
      window.addEventListener('resize', this.setCanvasSize)
      this.frame() // kick off animation
    },
    onNewId (id) {
      this.loading = true
      // Tear down old scene
      window.cancelAnimationFrame(this.frameId)
      Threads.Controller.terminate(this.$refs.canvas)
      // Build up new
      if (id !== undefined && id !== 'undefined') {
        // if there is a scene, load that
        this.$store.dispatch('scene/fetchState', { id: id })
          .then(() => {
            this.initialize()
            this.loading = false
          })
          .catch(error => console.error(error))
      } else {
        this.$store.commit('setScene', BlankScene())
        this.initialize()
        this.loading = false
      }
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.onNewId(id)
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.frameId)
    Threads.Controller.terminate(this.$refs.canvas)
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
      this.onNewId(id) // if the scene id changes, load the new scene
    }
  },
  components: {
    TsSettingsSheet
  }
}
</script>

<style scoped lang="css">
  canvas {
    position: fixed;
    top: 0px;
    left: 0px;
    display: block;
    margin: 0;
    padding: 0;
  }
</style>
