<template lang="html">
  <v-container grid-list-md mt-5>
    <v-layout row wrap justify-center>
      <v-flex xs12 md8>
        <v-card>
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-flex xs12>
                <v-avatar
                  size="200px"
                  class="elevation-4"
                >
                  <img :src="profilePicture" alt="alt">
                </v-avatar>
              </v-flex>
              <v-flex xs12>
                <v-form>
                  <v-text-field
                    label="User Name"
                    :value="userName"
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
                <v-btn class="mb-3" :disabled="!unsavedData" block color="accent">Save</v-btn>
                <v-btn
                  block
                  color="error"
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
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      unsavedData: false,
      profilePicture: 'https://static1.squarespace.com/static/562c4295e4b057e30c6abc89/t/5a2c8a52652deadcd278c51c/1512875683024/IMG_20170627_180831_097.jpg?format=750w'
    }
  },
  computed: {
    // User Fields
    ...mapState('user', [
      'userName',
      'email'
    ])
  },
  methods: {
    ...mapMutations('user', [
      'setUsername'
    ]),
    onLoadScene (id) {
      this.$router.push('/edit/' + id)
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
