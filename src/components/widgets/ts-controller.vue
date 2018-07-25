<template lang="html">
  <v-container pa-0 ma-0 fluid>
    <v-layout row wrap justify-center align-center>
      <v-flex xs2>
        <v-btn
          color="primary"
          fab
          small
        >
          <v-icon>undo</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          fab
          small
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs8>
        <ts-arrows></ts-arrows>
      </v-flex>
      <v-flex xs2>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TsArrows from '@/components/widgets/ts-arrows'
export default {
  components: {
    TsArrows
  }
}
</script>

<style lang="css">
</style>
