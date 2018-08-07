<template lang="html">
<v-container fluid text-xs-center px-0 py-3>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        :color="color"
        fab
        small
        class="ma-0 elevation-0"
        @click="arrowClickUp()"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        :color="color"
        fab
        small
        class="my-0 mx-4 elevation-0"
        @click="arrowClickLeft()"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn
        :color="color"
        fab
        small
        class="my-0 mx-4 elevation-0"
        @click="arrowClickRight()"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        :color="color"
        fab
        small
        class="ma-0 elevation-0"
        @click="arrowClickDown()"
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
    arrowClickUp () {
      switch (this.control) {
        case 'scene/updateThreadSpeed':
          this.$store.commit(this.control, {direction: [-1, 0, 0]})
          break
        case 'scene/updateThreadPosition':
          this.$store.commit(this.control, {direction: [0, 0, -1]})
          break
        case 'scene/moveCamera':
          this.$store.commit(this.control, {phiStepSize: -0.1})
          break
        default:
      }
    },
    arrowClickDown () {
      switch (this.control) {
        case 'scene/updateThreadSpeed':
          this.$store.commit(this.control, {direction: [1, 0, 0]})
          break
        case 'scene/updateThreadPosition':
          this.$store.commit(this.control, {direction: [0, 0, 1]})
          break
        case 'scene/moveCamera':
          this.$store.commit(this.control, {phiStepSize: 0.1})
          break
        default:
      }
    },
    arrowClickRight () {
      switch (this.control) {
        case 'scene/updateThreadSpeed':
          this.$store.commit(this.control, {direction: [0, 1, 0]})
          break
        case 'scene/updateThreadPosition':
          this.$store.commit(this.control, {direction: [1, 0, 0]})
          break
        case 'scene/moveCamera':
          this.$store.commit(this.control, {thetaStepSize: -0.1})
          break
        default:
      }
    },
    arrowClickLeft () {
      switch (this.control) {
        case 'scene/updateThreadSpeed':
          this.$store.commit(this.control, {direction: [0, -1, 0]})
          break
        case 'scene/updateThreadPosition':
          this.$store.commit(this.control, {direction: [-1, 0, 0]})
          break
        case 'scene/moveCamera':
          this.$store.commit(this.control, {thetaStepSize: 0.1})
          break
        default:
      }
    }
  },
  props: [
    'control',
    'color'
  ]
}
</script>

<style lang="css">
  #btn-wrapper {
    width: 100px;
    height: 100px
  }
</style>
