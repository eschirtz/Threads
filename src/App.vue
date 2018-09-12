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
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        app
        fixed
        :scroll-threshold='100'
        scroll-off-screen
        flat
        color='primary'
      >
        <v-toolbar-side-icon
          @click.native.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer;">
            <v-avatar
              size="40px"
            >
              <img src="@/assets/images/ICON-white.svg" alt="alt">
            </v-avatar>
            <span style="vertical-align: -3px;">THREADS</span>
          </router-link>
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
      toolbar: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        {title: 'New Scene', link: '/edit/undefined', icon: 'add_circle'}
      ]
      if (this.userIsAuthenticated) {
        menuItems.push(
          {title: 'Scenes', link: '/scenes', icon: 'list'},
          {title: 'Profile', link: '/account', icon: 'person'}
        )
      } else {
        menuItems.push(
          {title: 'Sign In', link: '/signin', icon: 'person_outline'}
        )
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.userIsAuthenticated
    }
  },
  name: 'App'
}
</script>
