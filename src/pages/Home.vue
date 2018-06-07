<template lang="html">
  <v-container>
    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat v-for="scene in scenes" :key="scene.id" class="ma-2">
          <v-container fluid class="pa-0">
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <canvas :id="scene.id" @click="canvasClick"></canvas>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-text>
                  <h2>{{scene.name}}</h2>
                  <h4>{{scene.author}}</h4>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as Threads from '@/custom_modules/threads/threads.js'
// TODO Import user data via firebase
let userData = require('@/assets/reference/sketch-template.json')
export default {
  data () {
    return {
      scenes: userData.scenes // load first scene
    }
  },
  methods: {
    canvasClick (event) {
      console.log('Clicked: ' + event.srcElement.id)
    }
  },
  mounted () {
    this.$nextTick(function () {
      // initialize scene (must happen first)
      this.scenes.forEach(function (scene) {
        Threads.initialize(document.getElementById(scene.id), scene)
      })
    })
  }
}
</script>

<style scoped lang="css">
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
