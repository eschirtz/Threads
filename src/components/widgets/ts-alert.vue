<template lang="html">
  <v-alert class="ma-0" type="error" dismissible @input="onClose" value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose () {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="css">
</style>
