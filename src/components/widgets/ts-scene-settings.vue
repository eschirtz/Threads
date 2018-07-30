<template lang="html">
  <v-container grid-list-sm pa-4 text-xs-center>
    <v-layout row wrap>
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
    ...mapActions('scene', [
      'save'
    ])
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    ...mapGetters([
      'userIsAuthenticated'
    ])
  }
}
</script>

<style lang="css">
</style>
