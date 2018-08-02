<template lang="html">
  <div class="ma-0 pa-0">
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
          <v-flex xs12 sm6 md4 mx-2>
            <router-link to="/edit/undefined" class="clean">
              <v-btn
                color="primary"
                large
                block
                depressed
              >Quick Start</v-btn>
            </router-link>
          </v-flex>
          <v-flex xs12 sm6 md4 mx-2>
            <router-link to="/signup" class="clean">
              <v-btn
                color="accent lighten-2"
                large
                block
                depressed
              >Create Account</v-btn>
            </router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-jumbotron color="primary" height="100%">
      <v-container grid-list-md my-5 pa-5>
        <v-layout row wrap>
          <v-flex xs12>
            <h3 class="display-3">Welcome...</h3>
            <p>Threads is an application that gives users a fun way of drawing in 3D.
              Weild a magic thread into infinite shapes and patterns.
              This oddly satisfying drawing toy will keep you mesmerized for ages.
              We can't wait to see what you'll create!</p>
          </v-flex>
          <v-flex xs12>
            <v-divider class="my-4"></v-divider>
          </v-flex>
          <v-flex xs12 md8 lg6 my-0>
              <h3 class="display-1">Get started</h3>
              <p>Learn all the keyboard shortcuts to become a thread spinning master in no time!</p>
              <v-dialog
                v-model="dialog"
                transition="fade-transition"
                width="100%"
              >
                <v-btn
                  class="mx-0"
                  color="white"
                  text-color="primary"
                  large
                  depressed
                  slot="activator"
                ><span class="primary--text">Controls</span></v-btn>
                <v-card>
                  <ts-keyboard-shortcuts></ts-keyboard-shortcuts>
                </v-card>
              </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-jumbotron height="100%" color="white">
      <v-container class="light-section pb-5" grid-list-lg>
        <v-layout row mt-5>
          <v-flex xs12 sm8 offset-sm2 class="text-xs-center">
            <h3 class="display-2">Drawing Mechanics</h3>
            <p class="subheading mt-3 mb-0">Learn the mechanics, make better drawings!</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap justify-space-around fill-height>
          <v-flex xs12 sm8 md11 my-4>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 sm8  md4 order-md2 class="text-xs-center">
            <img class="png-shadow" src="@/assets/images/wand-full.png" height="200px" alt="wand-image">
          </v-flex>
          <v-flex xs12 sm8  md6 mt-3>
            <h3 class="headline mb-3">How are threads made?</h3>
            <p>When you draw on the screen your stroke is extruded into 3D space following the motion of the spindle. You can imagine it as if you are painting on a transparent sphere that is rotating around, when you hold your brush (mouse) still, the ball would still be spinning relative to the brush, leaving a mark across the ball.</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap mt-0 justify-space-around align-space-between>
          <v-flex xs12 sm8 md4 class="text-xs-center">
            <img class="png-shadow" src="@/assets/images/user-full.png" height="200px" alt="user-image">
          </v-flex>
          <v-flex xs12 sm8 md6 mt-3>
            <h3 class="headline mb-3">At what depth am I drawing?</h3>
            <p>The depth at which you are drawing may seem arbitrary, especially since the screen on which you are drawing is 2D, there's no depth information. However, the way Threads works is that the position of the spindle determines the depth. But it is not just the spindle, it also depends on the orientation of the camera. Your drawings are made on the plane parallel to the camera, at the depth of the spindle. So looking top down, you'd be drawing on the "x-z" plane, where looking straight ahead, you are drawing on the "x-y plane".</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center mt-5>
            <a href="https://eschirtz.com">
              <img height="60px" src="@/assets/images/ICON.svg" alt="logo">
            </a>
          </v-flex>
          <v-flex xs12 text-xs-center pa-0>
            <a href="https://eschirtz.com">ESCHIRTZ.COM</a>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
import TsKeyboardShortcuts from '@/components/ts-keyboard-shortcuts.vue'
export default {
  data () {
    return {
      dialog: false
    }
  },
  components: {
    TsKeyboardShortcuts
  }
}
</script>

<style scoped lang="css">
  .clean {
    text-decoration: none;
  }
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
  .light-section{
    color: #303030;
  }
  .light-section hr {
    background-color: #666666;
    border: none;
    height: 1px;
  }
</style>
