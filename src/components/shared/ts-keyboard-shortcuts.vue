<template lang="html">

  <v-data-table
      :headers="headers"
      :items="controls"
      disable-initial-sort
      hide-actions
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">
        <span
          v-for="key in props.item.keys"
          :key="key"
        ><kbd class="mr-1 my-1">{{key}}</kbd></span></td>
      <td class="text-xs-right">{{ props.item.description }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Action',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Keybinding/Macro', value: 'keys' },
        { text: 'Description', value: 'description' }
      ],
      controls: [
        {
          name: 'Draw',
          keys: ['Mouse Click', 'Touch'],
          description: 'Adds a stream of points to the current thread'
        },
        {
          name: 'Move Spindle',
          keys: ['i', 'j', 'k', 'l'],
          description: 'Moves the spindle (and current thread) along the x/z plane'
        },
        {
          name: 'Rotate Spindle',
          keys: ['Arrow Up', 'Arrow Down', 'Arrow Left', 'Arrow Right'],
          description: 'Rotates the spindle about it\'s x and y axis'
        },
        {
          name: 'Undo Last Point',
          keys: ['Ctrl + Z', 'Command + Z'],
          description: 'Removes the most recently added points (hold down to remove faster)'
        },
        {
          name: 'Add Thread',
          keys: ['+', 'c'],
          description: 'Commits (c) the current thread, and begins a new one'
        },
        {
          name: 'Move Camera',
          keys: ['a', 'w', 's', 'd'],
          description: 'Orbit the camera, up, down, left, right'
        },
        {
          name: 'Next/Previous Thread',
          keys: ['Shift + Arrow Right', 'Shift + Arrow Left'],
          description: 'Cycles consecutively through all threads in the scene'
        },
        {
          name: 'Pause Animation',
          keys: ['Spacebar'],
          description: 'Freezes the motion for all animation'
        },
        {
          name: 'Toggle Build Mode',
          keys: ['h'],
          description: 'Hides (h) the grid and spindle, only showing your creations'
        }
      ]
    }
  }
}
</script>

<style lang="css">
  kbd{
    /* background-color: rgba(0, 0, 0, 0.25); */
  }
</style>
