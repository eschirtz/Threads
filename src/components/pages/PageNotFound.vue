<template lang="html">
  <v-jumbotron color="white" height="100%">
    <v-container grid-list-md text-xs-center pa-5 >
      <v-layout row wrap justify-center align-center py-5>
        <v-flex xs12 mb-5>
            <img
              class="hidden-sm-and-down"
              height="200px"
              src="@/assets/images/Horizontal-full-color.svg" alt="Horizontal">
            <img
              class="hidden-md-and-up"
              height="300px"
              src="@/assets/images/Vertical-full-color.svg" alt="Horizontal">
        </v-flex>
        <v-flex xs12 style="color: black">
          <h4 class="display-1"><span>Page not found :(</span></h4>
          <p class="ma-2">Re-routing in {{timer}}s</p>
        </v-flex>
        <v-flex xs12 sm6 md4 mx-2>
          <router-link to="/" class="clean-link">
            <v-btn
              color="accent lighten-2"
              large
              block
              depressed
            >Home</v-btn>
          </router-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
  data () {
    return {
      timer: 5
    }
  },
  methods: {
    countdown () {
      const vueModel = this
      const counter = setInterval(function () {
        if (--vueModel.timer > 0) {
        } else {
          vueModel.$router.push('/')
          clearInterval(counter)
        }
      }, 1000)
    }
  },
  mounted () {
    this.countdown() // kick off countdown
  }
}
</script>

<style lang="css">
</style>
