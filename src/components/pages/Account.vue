<template lang="html">
  <v-container>
    <v-layout row wrap justify-space-around fill-height>
      <v-flex xs12 sm8 md6 mt-5>
        <v-card>
          <v-card-media
            height="200px"
            src="https://source.unsplash.com/ecH8mCm4nWk/1600x900"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{fullName}}</h3>
              <div>This part of the site is under construction<br>Keep checking back, we'll have it up in no time</div>
            </div>
          </v-card-title>
          <v-card-text>
            {{ sceneName }}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="setName({firstName: 'Eric'})" flat>Add {{ firstName }}</v-btn>
            <v-btn color="accent" @click="foo()" flat>Another Action</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    // User Fields
    ...mapState('user', [
      'firstName'
    ]),
    ...mapGetters('user', [
      'fullName'
    ]),
    ...mapState('scene', {
      sceneName: 'name'
    })
  },
  methods: {
    ...mapMutations('user', [
      'setName'
    ])
  }
}
</script>

<style lang="css">
</style>
