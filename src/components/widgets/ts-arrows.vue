<template lang="html">
<v-container fluid text-xs-center pa-3>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="ma-0 elevation-0"
        @click="arrowClick('up')"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="my-0 mx-4 elevation-0"
        @click="arrowClick('left')"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn
        color="error"
        fab
        small
        class="my-0 mx-4 elevation-0"
        @click="arrowClick('right')"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="ma-0 elevation-0"
        @click="arrowClick('down')"
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  methods: {
    arrowClick (arrow) {
      switch (arrow) {
        case 'up':
          this.$store.commit(this.control, {direction: [-1, 0, 0]})
          break
        case 'down':
          this.$store.commit(this.control, {direction: [1, 0, 0]})
          break
        case 'right':
          this.$store.commit(this.control, {direction: [0, 1, 0]})
          break
        case 'left':
          this.$store.commit(this.control, {direction: [0, -1, 0]})
          break
        default:
      }
    }
  },
  props: [
    'control'
  ]
}
</script>

<style lang="css">
  #btn-wrapper {
    width: 100px;
    height: 100px
  }
</style>
