<template lang="html">
  <v-card>
    <v-card-title
      class="headline primary dark"
      primary-title
    >
      <v-icon class="mr-2">settings</v-icon>
      Settings
    </v-card-title>
    <v-card-text>
      <v-text-field
        name="sceneName"
        label="Scene Name"
        :value="scene.name"
        @input="changeName"
        id="something-id"
      ></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        flat
        @click="dialog = false"
      >
        Done
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: true, // send up to NewScene.vue
      settings: {
        sceneName: ''
      }
    }
  },
  methods: {
    changeName (value) {
      this.settings.sceneName = value
      this.$emit('settingChanged', {
        name: 'name',
        value: this.settings.sceneName
      })
    }
  },
  props: [
    'scene'
  ]
}
</script>

<style lang="css">
</style>
