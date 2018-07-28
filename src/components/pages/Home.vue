<template lang="html">
  <div class="ma-0 pa-0">
    <v-jumbotron height="100%">
      <v-container mt-4>
        <v-layout row wrap my-3 justify-space-around fill-height>
          <v-flex xs12 sm8 md8 lg6 my-4>
            <div class="">
              <img src="@/assets/images/Spool.png" class="hero-img hidden-sm-and-down" alt="" height="200px">
              <div class="text-xs-center text-md-right">
                <h3 class="display-3 hero-text pb-0">THREADS</h3>
                <h3 class="subheading"><i>A 3D Drawing Toy</i></h3>
                <router-link style="text-decoration: none" to="/newscene">
                  <v-btn
                    color="primary"
                    round
                    large
                    class="mx-0 my-4"
                  >Spin A Thread!</v-btn>
                </router-link>
              </div>
            </div>
          </v-flex>
          <v-flex xs12 sm8 md11 mt-5>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-container>
      <v-layout row wrap justify-space-around fill-height my-4>
        <v-flex xs12 sm8  md4 order-md2 class="text-xs-center">
          <img class="png-shadow" src="@/assets/images/wand-full.png" height="200px" alt="wand-image">
        </v-flex>
        <v-flex xs12 sm8 md5 mt-3>
          <h3 class="display-1 mb-3">MAGIC THREAD!</h3>
          <p>Weild a magic thread into infinite shapes and patterns. This oddly satisfying drawing toy will keep you mesmerized for hours on end!</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap my-4 justify-space-around align-space-between>
        <v-flex xs12 sm8 md4 class="text-xs-center">
          <img class="png-shadow" src="@/assets/images/user-full.png" height="200px" alt="user-image">
        </v-flex>
        <v-flex xs12 sm8 md5 mt-3>
          <h3 class="display-1 mb-3">SHOW OFF!</h3>
          <p>Show off your creations to your friends. Threads saves all your work so you can revisit and update your masterpieces.</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {

  }
}
</script>

<style scoped lang="css">
  .png-shadow {
    -webkit-filter: drop-shadow(0px 3px 2px #222);
    filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
  }
  .hero-img {
    position: absolute;
  }
  .hero-text {
    z-index: 1;
  }
</style>
