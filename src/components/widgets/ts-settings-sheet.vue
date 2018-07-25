<template lang="html">
<div>
  <v-card style="background: rgba(0,0,0,0.5)">
    <v-tabs
      color="secondary"
      dark
      slider-color="white"
      show-arrows
    >
    <v-tab ripple>
      <!-- <v-icon style="transform: rotate(45deg)">zoom_out_map</v-icon> -->
      Controller
    </v-tab>
    <v-tab-item>
        <ts-controller></ts-controller>
    </v-tab-item>
    <v-tab ripple>Settings</v-tab>
    <v-tab-item>
      <!-- <v-card flat> -->
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field
                name="name"
                label="Scene Name"
                id="id"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                name="name"
                label="Another Setting"
                id="id"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      <!-- </v-card> -->
    </v-tab-item>
    </v-tabs>
  </v-card>
</div>
</template>

<script>
import TsController from '@/components/widgets/ts-controller'
export default {
  data () {
    return {
      activeTab: 0
    }
  },
  components: {
    TsController
  }
}
</script>

<style lang="css">
</style>
