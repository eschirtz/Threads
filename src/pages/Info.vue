<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm5>
        <v-container class="pa-1">
          <v-card>
            <v-card-title class="headline" primary-title>
              Keyboard Controlls
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              Y-rotation <kbd>Arrow Right</kbd> <kbd>Arrow Left</kbd><br>
              X-rotation <kbd>Arrow Up</kbd> <kbd>Arrow Down</kbd><br>
              Move Spindle <kbd>i</kbd> <kbd>j</kbd> <kbd>k</kbd> <kbd>l</kbd><br>
              <v-divider class="mt-2 mb-2"></v-divider>
              Orbit Camera <kbd>a</kbd> <kbd>w</kbd> <kbd>s</kbd> <kbd>d</kbd><br>
              Next Thread <kbd>Shift + Arrow Right</kbd><br>
              Previous Thread <kbd>Shift + Arrow Left</kbd><br>
              Toggle Build Mode <kbd>h</kbd><br>
            </v-card-text>
          </v-card>
          <h2 class="headline">Keyboard Controls</h2><br>
          <p>

          </p>
        </v-container>
      </v-flex>
      <v-flex xs12 sm7>
        <v-card >
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-card-text>
                  <h2>The Author</h2>
                  <v-subheader class="pa-0">Eric Schirtzinger</v-subheader>
                  <v-divider class="mt-1 mb-1"></v-divider>
                  <p>
                  Hey, my name is <strong>Eric Schirtzinger</strong>. I currently study
                  Computer Engineering at UW Madison. The initial concept for this application
                  was created for an introductory computer graphics course (CS559). We were learning
                  coordinate transformations. I thought it would be fun to use these techniques to be
                  able to draw... blah blah</p>
                  <v-btn outline color="accent" class="ml-0" target="_blank" href="http://www.eschirtz.com/">eschirtz.com</v-btn>
                </v-card-text>
              </v-flex>
              <v-flex xs12 md6 hidden-sm-and-down>
                <v-card-media
                  height="100%"
                  src="https://static1.squarespace.com/static/562c4295e4b057e30c6abc89/t/5a2c8a52652deadcd278c51c/1512875683024/IMG_20170627_180831_097.jpg?format=750w"
                >
                </v-card-media>
              </v-flex>
            </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
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
</style>
