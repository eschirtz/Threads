<template lang="html">
  <v-card>
    <v-card-title>
      <h3 class="headline">Settings</h3>
    </v-card-title>
    <v-container justify-space-around text-xs-center>
      <v-layout row wrap >
        <v-flex xs12>
          <v-text-field
            name="name"
            label="Scene Name"
            :value="sceneName"
            @input="bindTextInput($event, 'scene/setName')"

          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-btn
            @click="updateThreadSpeed({direction: [1,0,0], stepSize: 2})"
            color="primary">up</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            @click="updateThreadSpeed({direction: [-1,0,0], stepSize: 2})"
            color="primary">down</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            @click="updateThreadSpeed({direction: [0,1,0], stepSize: 2})"
            color="primary">left</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            @click="updateThreadSpeed({direction: [0,-1,0], stepSize: 2})"
            color="primary">right</v-btn>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
          <v-btn
            color="error"
            fab
            @click="addThread()"><v-icon>add</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('scene', {
      sceneName: 'name'
    })
  },
  methods: {
    bindTextInput (input, action) {
      console.log(input)
      this.$store.commit(action, input)
    },
    ...mapMutations('scene', {
      updateThreadSpeed: 'updateThreadSpeed',
      addThread: 'addThread',
      setSceneName: 'setSceneName'
    })
  }
}
</script>

<style lang="css">
</style>
