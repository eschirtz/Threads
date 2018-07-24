<template lang="html">
<v-container fluid text-xs-center>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="ma-0 elevation-0"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="my-0 mx-4 elevation-0"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn
        color="error"
        fab
        small
        class="my-0 mx-4 elevation-0"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        color="error"
        fab
        small
        class="ma-0 elevation-0"
      >
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
}
</script>

<style lang="css">
  #btn-wrapper {
    width: 100px;
    height: 100px
  }
</style>
