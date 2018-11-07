<template class='black'>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg10>
        <v-container fluid grid-list-md>
          <v-subheader class="pl-0">My Scenes</v-subheader>
          <v-layout row wrap>
            <v-flex
              xs12 sm6 md4
              v-for="scene in scenes"
              :key="scene.id"
            >
              <v-card
                height="100%"
                @click.native="onLoadScene(scene.id)"
                hover
              >
                <v-img
                  height="100px"
                  :src="placeholderThumbnails[scene.name.length % 4]"
                  :lazy-src="placeholderThumbnails[scene.name.length % 4 + 4]"
                >
                </v-img>
                <v-card-actions>
                  <span class="subheading white--text" style="font-size: 1.4em" v-text="scene.name"></span>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    fab
                    flat
                    small
                    @click.stop="prepareSceneForDeletion(scene.id, scene.name)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <v-btn
                    color="primary"
                    fab
                    flat
                    small
                    disabled
                  >
                    <v-icon>share</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <!-- Absolute elements -->
    <v-dialog v-model="confirmDeleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete {{sceneToDelete.name}}?</v-card-title>
        <v-card-text>You cannot undo this action, all data for this scene will be deleted!</v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.native="confirmDeleteDialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" flat @click.native="onDeleteScene(sceneToDelete.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <lottie
      v-if="loading"
      :options="loaderAnimationOptions"
      :height="100" :width="100"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    />
  </v-container>
</template>

<script>
import loaderAnimation from '@/assets/animations/general-loader.json'
import {mapGetters, mapState} from 'vuex'
export default {
  data () {
    return {
      loaderAnimationOptions: {animationData: loaderAnimation},
      confirmDeleteDialog: false,
      sceneToDelete: {id: undefined, name: undefined},
      placeholderThumbnails: [
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-1.png?alt=media&token=52a40fe9-108e-46d3-b74c-2e564c0174b5',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-2.png?alt=media&token=3951ae81-b66f-4613-8200-95a0bc7ec41d',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-3.png?alt=media&token=8b5e65fc-fa12-4b0d-95ac-02a22bee7974',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-4.png?alt=media&token=14699486-05ee-41a2-9c99-f8c33d8abbb6',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-1-lazy.jpg?alt=media&token=d2037068-d9ff-4e91-8b23-6cfef849b0b1',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-2-lazy.jpg?alt=media&token=e8c94b43-a7d0-43e1-92c9-a8e0e80efd25',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-3-lazy.jpg?alt=media&token=9347bc64-915c-40aa-a11c-639c9daeb412',
        'https://firebasestorage.googleapis.com/v0/b/thread-spinner.appspot.com/o/placeholders%2Fscene-thumbnails%2Fscene-thumb-4-lazy.jpg?alt=media&token=fe1fa711-d1bf-4c60-a5f7-8b3eca77c2d1'
      ]
    }
  },
  computed: {
    randomThumbnail () {
      let index = Math.round(Math.random(new Date().getTime()) * 100) % 4
      console.log(index)
      return index
    },
    ...mapGetters('user', {
      scenes: 'scenes'
    }),
    ...mapState({
      loading: 'loading'
    })
  },
  methods: {
    onLoadScene (id) {
      this.$router.push('/edit/' + id)
    },
    prepareSceneForDeletion (id, name) {
      this.sceneToDelete = {id: id, name: name}
      this.confirmDeleteDialog = true
    },
    onDeleteScene (id) {
      this.confirmDeleteDialog = false
      this.$store.dispatch('scene/deleteSceneByID', id)
    }
  }
}
</script>
