<template>
  <v-app dark>
    <v-content>
      <v-navigation-drawer
        v-model="sideNav"
        app
        flat
        temporary
      >
        <v-list>
          <v-list-tile
            v-for="item in menuItems" :key="item.title"
            router
            :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title style = "font-weight: lighter">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        app
        flat
        class='primary'
      >
        <v-toolbar-side-icon
          @click.native.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer; font-weight: lighter"><v-icon left>gesture</v-icon>THREAD SPINNER</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            router
            :to="item.link"
          ><v-icon left>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        {title: 'New Scene', link: '/newscene', icon: 'add_circle'},
        {title: 'About', link: '/about', icon: 'info'},
        {title: 'Account', link: '/account', icon: 'person'}
      ]
    }
  },
  name: 'App'
}
</script>
