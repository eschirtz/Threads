<template lang="html">
  <v-container grid-list-sm pa-4 text-xs-center>
    <v-layout row wrap>
      <v-flex 12>
        <v-btn
          color="grey darken-3"
          fab
          small
        >
          <v-icon>pause</v-icon>
        </v-btn>
        <v-btn
          color="grey darken-3"
          fab
          small
        >
          <v-icon>stop</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="color"
          label="Color"
          id="id"
          v-model="threadColor"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-btn block color="error"><v-icon left>delete</v-icon>Delete</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    threadColor: {

      get () {
        const thread = this.$store.getters['scene/activeThread'] || {}
        let color = thread.color
        return color
      },
      set (value) {
        console.log(this.$store.getters['scene/activeThread'])
        this.$store.commit('scene/setColor', value)
      }
    }
  }
}
</script>

<style lang="css">
</style>
