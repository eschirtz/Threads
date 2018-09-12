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
                  Sign Up
                </v-card-title>
                <v-card-text>
                  <form @submit.prevent="onSignup">
                    <v-text-field
                      name="userName"
                      label="User Name"
                      v-model="userName"
                      type="text"
                      required
                    ></v-text-field>
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
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                    <v-card-actions class="px-0">
                      <v-layout row wrap text-xs-center>
                          <v-btn
                            type="submit"
                            color="primary"
                            block
                            depressed
                            :disabled="!canSubmit"
                            :loading="loading"
                          >Sign Up
                            <span slot="loader" class="custom-loader"><v-icon>cached</v-icon></span>
                          </v-btn>
                        <v-flex xs12 class="mt-4">
                          Already have an account?
                          <router-link to="/signin" style="text-decoration: none"><v-btn color="primary" flat>Sign In</v-btn></router-link>
                        </v-flex>
                      </v-layout>
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
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : true
    },
    canSubmit () {
      return !this.loading && this.comparePasswords === true
    },
    ...mapState([
      'loading',
      'error'
    ]),
    ...mapGetters('user', [
      'isAuthenticated'
    ])
  },
  watch: {
    isAuthenticated (authenticated) {
      if (authenticated) {
        this.$router.push('/') // redirect home when user is signed in
      }
    }
  },
  methods: {
    onSignup () {
      if (this.comparePasswords === true) {
        this.$store.dispatch('user/signUp', {
          email: this.email,
          password: this.password,
          userName: this.userName
        })
      }
    },
    onDismissed () {
      this.$store.commit('clearError')
    }
  },
  beforeDestroy () {
    this.$store.commit('clearError')
  }
}
</script>

<style lang="css">
</style>
