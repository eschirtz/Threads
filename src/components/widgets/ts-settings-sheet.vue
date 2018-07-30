<template lang="html">
<div>
  <v-card style="background: rgba(0,0,0,0.4)">
    <v-tabs
      color="black"
      dark
      slider-color="white"
      show-arrows
    >
    <v-tab ripple>
      <!-- <v-icon style="transform: rotate(45deg)">zoom_out_map</v-icon> -->
      Controller
    </v-tab>
    <v-tab-item>
      <v-container my-0 py-0 px-1>
        <ts-controller></ts-controller>
      </v-container>
    </v-tab-item>
    <v-tab ripple>Thread</v-tab>
    <v-tab-item>
      <ts-thread-settings></ts-thread-settings>
    </v-tab-item>
    <v-tab ripple>Scene</v-tab>
    <v-tab-item>
      <ts-scene-settings></ts-scene-settings>
    </v-tab-item>
    </v-tabs>
  </v-card>
</div>
</template>

<script>
import TsController from '@/components/widgets/ts-controller'
import TsThreadSettings from '@/components/widgets/ts-thread-settings'
import TsSceneSettings from '@/components/widgets/ts-scene-settings'

export default {
  data () {
    return {
      activeTab: 0
    }
  },
  components: {
    TsController,
    TsThreadSettings,
    TsSceneSettings
  }
}
</script>

<style lang="css">
</style>
