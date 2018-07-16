<template>
  <div>
      <v-jumbotron class="text-xs-center text-sm-left">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="display-3">All About <i>Threads</i></h3>
              <span class="subheading">This page serves to teach you how to use the <i>Threads</i> application, as well as a platform to showcase some of the programming and computer graphics techniques I used in it's development.</span>
              <v-divider class="my-3 hidden-xs-only"></v-divider>
              <div class="title mb-3 hidden-xs-only">Learn the keyboard shortcuts to get up and running fast!</div>
              <v-dialog
                v-model="dialog"
                width="auto"
              >
                <v-btn
                  slot="activator"
                  class="mx-0 hidden-xs-only"
                  color="primary"
                  large
                  round
                >
                  Show Me!
                </v-btn>
                <v-card>
                  <ts-keyboard-shortcuts></ts-keyboard-shortcuts>
                  <v-btn
                    color="error"
                    flat
                    @click="dialog=false"
                  >Close</v-btn>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-jumbotron
        class="text-xs-center text-md-right accent lighten-2"
        height="100%"
      >
        <v-container fill-height>
          <v-layout align-center row wrap>
            <v-flex
              sm12
              md4
              class="text-xs-center"
            >
              <v-avatar
                size="248px"
                class="ma-4 elevation-4"
              >
                <img src="@/assets/images/ts-avatar-eric.jpg" alt="Eric Schirtzinger">
              </v-avatar>
            </v-flex>
            <v-flex
              sm12
              md8
              class="ts-light"
            >
              <h3 class="display-3">Hello!</h3>
              <span class="subheading">My name is Eric Schirtzinger, I am a computer engineering student at the University of Wisconsin Madison. I also have a deep rooted passion in film and the arts.
              The field of computer graphics lives at the interface of tech and art, and that's what inspired me to create this app. I hope that you enjoy learning a little about what went into the making of <i>Threads</i>,
              and that you enjoy using it!</span><br>
              <a style="text-decoration: none" target="_blank" href="https://eschirtz.com">
                <v-btn
                  slot="activator"
                  class="my-3 mx-0"
                  color="error"
                  large
                  round
                >
                  Eschirtz.com
                </v-btn>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
      <v-jumbotron class="accent lighten-2 text-xs-left" height="100%">
        <v-container grid-list-xs,sm,md,lg,xl>
          <v-layout row wrap>
            <v-flex xs12 class="ts-light">
            </v-flex>
          </v-layout>
        </v-container>
        <ts-keyboard-shortcuts></ts-keyboard-shortcuts>
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

<style scoped>
  h2{
    font-weight: lighter
  }
  p{
    font-weight: lighter
  }
  kbd{
    background: rgba(0,0,0,0.5)
  }
  .ts-light {
    color: black;
  }
  .ts-light hr {
    background-color: black;
  }
</style>
