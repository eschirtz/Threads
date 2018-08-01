<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-flex
        xs12
        sm10 offset-sm1
        md8 offset-md2
        xl4 offset-xl4
        mt-5
      >
        <v-card>
          <v-container pa-0 grid-list-xs,sm,md,lg,xl>
            <v-layout row wrap v-if="error">
              <v-flex xs12>
                <ts-alert @dismissed="onDismissed" :text="error.message"></ts-alert>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-title class="headline">
                  Sign In
                </v-card-title>
                <v-card-text>
                  <form @submit.prevent="onSignin">
                    <v-text-field
                      name="email"
                      label="Email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      name="password"
                      label="Password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                    <v-card-actions class="px-0">
                      <v-btn
                        type="submit"
                        color="primary"
                        block
                        depressed
                        :disabled="!canSubmit"
                        :loading="loading"
                      >Sign In
                        <span slot="loader" class="custom-loader"><v-icon>cached</v-icon></span>
                      </v-btn>
                    </v-card-actions>
                  </form>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    canSubmit () {
      return !this.loading
    },
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters([
      'userIsAuthenticated'
    ])
  },
  watch: {
    userIsAuthenticated (authenticated) {
      // redirect home when/if user is signed in
      if (authenticated) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('user/signIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.commit('clearError')
    }
  }
}
</script>

<style lang="css">
</style>
