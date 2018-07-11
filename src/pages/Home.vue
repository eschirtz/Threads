<template lang="html">
  <v-container pa-5>
    <v-layout row wrap justify-center>
      <v-flex
        xs12
        sm3
      >
        <img
          id="hero-img"
          src="@/assets/images/Spool.png"
          alt="spool-image"
          width="100%"
        >
      </v-flex>
      <v-flex
        xs12 text-xs-center
        sm3
      >
        <h2
          class="display-2 mt-2"
        >
        THREADS
        </h2>
        <router-link to="/newscene" tag="span" style="cursor: pointer;">
          <v-btn
            round
            large
            color="error"
            class="ma-0 mt-2"
          >Spin Thread!</v-btn>
        </router-link>
      </v-flex>

    </v-layout>
    <div class="spacer ma-5 hidden-sm-and-down">

    </div>
    <v-layout row wrap justify-center>
      <v-flex
        xs8  text-xs-center
        sm2
        mt-5 mb-2
      >
        <img
          id="hero-img"
          src="@/assets/images/wand-full.png"
          alt="wand-image"
          width="100%"
        >
      </v-flex>
      <v-flex
        xs10 text-xs-center
        sm6 text-sm-right
        mt-4
      >
        <p class="display-1">
          <i>Magic Thread</i>
        </p>
        <p>Weild a magic thread into infinite shapes and patterns. This oddly satisfying drawing toy will keep you mesmerized for at least a couple seconds</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="css">
  #hero-img {
    max-height: 200px;
    object-fit: contain;
  }
</style>
