<template lang="html">
<div>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Arrow Controls</div>
      <v-container grid-list-xs>
        <ts-arrows></ts-arrows>
      </v-container>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div slot="header">Arrow Controls</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </v-expansion-panel-content>
  </v-expansion-panel>
</div>
</template>

<script>
import TsArrows from '@/components/widgets/ts-arrows'
export default {
  components: {
    TsArrows
  }
}
</script>

<style lang="css">
</style>
