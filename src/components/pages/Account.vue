<template lang="html">
  <v-container grid-list-md>
    <v-layout row wrap justify-space-around fill-height>
      <v-flex xs12 sm10 md8 mb-1 mt-2>
        <v-card>
          <v-card-media
            height="200px"
            src="https://source.unsplash.com/ecH8mCm4nWk/800x450"
          >
          </v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ userName }}</h3>
              <div>This part of the site is under construction<br>Keep checking back, we'll have it up in no time</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="editUserInfo()" flat>Edit Info</v-btn>
            <v-btn color="accent" @click="onLogout()" flat>Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 md8 my-4>
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex
        v-for="scene in scenes"
        :key="scene.key"
        xs12 sm5 md4
      >
        <v-card>
          <v-card-media
            height="100px"
            :src="`https://unsplash.it/800/450?image=${Math.floor(Math.random() * 100) + 1}`"
          >
          </v-card-media>
          <v-card-title primary-title class="pb-0 pt-2">
            <div>
              <h3 class="headline mb-0">{{ scene.name }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" @click="onLoadScene(scene.id)" flat fab>
              <v-icon left>edit</v-icon>
              <span class="hidden-sm-and-down">Edit Scene</span>
            </v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn color="accent" flat fab>
              <v-icon left>share</v-icon>
              <span class="hidden-sm-and-down">Share</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 my-2 class="text-xs-center">
        <v-btn
          fab
          depressed
          color="primary"
          @click="onLoadScene()"
        >
          <v-icon large>add</v-icon>
        </v-btn>
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
      'userName'
    ]),
    ...mapGetters('user', [
      'scenes'
    ])
  },
  methods: {
    ...mapMutations('user', [
      'setUsername'
    ]),
    onLoadScene (id) {
      this.$router.push('/edit/' + id)
    },
    editUserInfo () {
      console.log('You\'re now editing')
    },
    onLogout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/') // redirect home
    }
  }
}
</script>

<style lang="css">
</style>
