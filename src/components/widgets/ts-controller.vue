<template lang="html">
  <v-container pa-0 ma-0 fluid>
    <v-layout row justify-center text-xs-center align-center>
      <v-flex xs2>
        <v-btn
          color="grey darken-3"
          fab
          small
        >
          <v-icon>undo</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-3"
          fab
          small
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs8>
        <ts-arrows :control="controlType"></ts-arrows>
      </v-flex>
      <v-flex xs2>
        <v-btn-toggle mandatory v-model="controlType">
          <v-btn flat value="scene/updateThreadSpeed">
            <v-icon>sync</v-icon>
          </v-btn>
          <v-btn flat value="scene/updateThreadPosition">
            <v-icon>open_with</v-icon>
          </v-btn>
          <v-btn flat value="scene/moveCamera">
            <v-icon>camera</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TsArrows from '@/components/widgets/ts-arrows'
export default {
  data () {
    return {
      controlType: 'scene/updateThreadSpeed'
    }
  },
  components: {
    TsArrows
  }
}
</script>

<style lang="css">
.btn-toggle {
  flex-direction: column;
}
</style>
