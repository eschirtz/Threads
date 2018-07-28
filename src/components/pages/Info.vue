<template>
  <div class="ma-0 pa-0">
    <v-container mt-5>
      <v-layout row>
        <v-flex xs12 sm8 offset-sm2 class="text-xs-center">
          <h3 class="display-3">How It All Works</h3>
          <p class="subheading mt-3">An overview of the key features and controls for this fun 3D drawing toy.</p>
          <v-divider class="my-3"></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 sm8 offset-sm2 class="text-xs-center text-sm-left">
          <p class="b mb-3 mt-2">While Threads is pretty easy to mess around with and make drawings,
            if you ever want to try to make something more precise it would be to your advantage to understand a little about how the drawing engine actually works!</p>
          <v-dialog
            v-model="dialog"
            width="100%"
          >
            <v-btn
              class="mx-0"
              color="primary"
              medium
              depressed
              slot="activator"
            >Controls</v-btn>
            <v-card>
              <ts-keyboard-shortcuts></ts-keyboard-shortcuts>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
    <v-jumbotron class="mt-5" height="100%" color="white">
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
      </v-container>
    </v-jumbotron>
    <v-container class="pb-5">
      <v-layout row wrap>
        <v-layout row mt-5>
          <v-flex xs12 sm8 offset-sm2 class="text-xs-center">
            <h3 class="display-2">A Look Behind The Scenes</h3>
            <p class="subheading mt-3 mb-0">A peak into what goes on to make <i>Threads</i> work.</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap my-3 justify-space-around fill-height>
          <v-flex xs12 sm8 md11 my-4>
            <v-divider></v-divider>
          </v-flex>
          <v-flex xs12 sm8  md4 class="text-xs-center">
            <img class="png-shadow" src="@/assets/images/wand-full.png" height="200px" alt="wand-image">
          </v-flex>
          <v-flex xs12 sm8  md6 mt-3>
            <h3 class="headline mb-3">This is all just placeholder</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap my-3 justify-space-around align-space-between>
          <v-flex xs12 sm8 md4 order-md2 class="text-xs-center">
            <img class="png-shadow" src="@/assets/images/user-full.png" height="200px" alt="user-image">
          </v-flex>
          <v-flex xs12 sm8 md6 mt-3>
            <h3 class="headline mb-3">This will probably be a cool code example.</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
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

<style scoped>
.light-section{
  color: #303030;
}
.light-section hr {
  background-color: #303030;
}
.png-shadow {
  -webkit-filter: drop-shadow(0px 3px 2px #222);
  filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
}
</style>
