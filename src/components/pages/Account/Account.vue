<template lang="html">
  <v-container grid-list-md mt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 md8>
        <v-card>
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-flex xs12 class="pb-0">
                <v-card-title primary-title class="pl-0 pt-2">
                  <span class="headline">User Information</span><v-spacer></v-spacer>
                  <span class="grey--text" v-if="unsavedData">Saving...</span>
                  <span class="grey--text" v-else>Data saved</span>
                </v-card-title>
                <v-form>
                  <v-text-field
                    label="User Name"
                    v-model="userName"
                  ></v-text-field>
                  <v-text-field
                    disabled
                    label="Email Address"
                    :value="email"
                  ></v-text-field>
                  <v-text-field
                    disabled
                    type="password"
                    label="Password"
                    value="password"
                  ></v-text-field>
                </v-form>
              </v-flex>
              <v-flex xs12>
                <v-btn
                  block
                  color="primary"
                  outline
                  @click="onLogout()">Logout</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  data () {
    return {
      timeoutId: undefined,
      unsavedData: false
    }
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.user.userName
      },
      set (value) {
        this.$store.commit('user/setUsername', value)
        this.unsavedData = true
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          this.saveState()
          this.unsavedData = false
        }, 750)
      }
    },
    ...mapState('user', [
      'email'
    ])
  },
  methods: {
    ...mapMutations('user', [
      'setUsername',
      'setUnsavedData'
    ]),
    ...mapActions('user', [
      'saveState'
    ]),
    onLogout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/') // redirect home
    },
    onSave () {
      this.saveState()
      this.setUnsavedData(false)
    }
  }
}
</script>

<style lang="css">
</style>
