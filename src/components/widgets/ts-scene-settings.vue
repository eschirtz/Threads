<template lang="html">
  <v-container grid-list-sm pa-4 text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          label="Scene Name"
          v-model="sceneName"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="userIsAuthenticated">
        <v-btn
          block
          color="accent"
          @click="save"
          :disabled="loading"
          :loading="loading"
          >
          <v-icon left>save</v-icon>Save
          <span slot="loader" class="custom-loader"><v-icon>cached</v-icon></span>
        </v-btn>
      </v-flex>
      <v-flex xs12 v-else>
        <v-subheader class="ml-0 pl-0">Create an account to save your scenes!</v-subheader>
        <router-link to="/signup" style="text-decoration: none">
          <v-btn
            block
            color="accent"
            >
            Create Account
          </v-btn>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  methods: {
    ...mapActions('scene', {
      storeNewScene: 'storeNew',
      storeScene: 'store'
    }),
    save () {
      const id = this.$store.state.scene.id
      if (id) {
        this.storeScene(id) // store/update the scene
      } else {
        this.storeNewScene() // store a new scene
      }
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    sceneName: {
      get () {
        return this.$store.state.scene.name
      },
      set (value) {
        this.$store.commit('scene/setName', value)
        this.$store.commit('user/setScene', {
          id: this.$store.state.scene.id,
          name: value
        })
        this.$store.dispatch('user/updateUserData')
      }
    },
    ...mapGetters([
      'userIsAuthenticated'
    ])
  }
}
</script>

<style lang="css">
</style>
