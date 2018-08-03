import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Alert from '@/components/widgets/ts-alert.vue'
// styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import './styles/master.css' // custom global css rules

// Overide Theme
Vue.use(Vuetify, {
  theme: {
    primary: '#e0694e',
    secondary: '#e3d9a2', //
    accent: '#048384', //
    error: '#BB0033', //
    warning: '#efc953', //
    success: '#5f9400' //
  }
})
Vue.component('ts-alert', Alert)
Vue.config.productionTip = false
// Bind the document title to page names
router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA25DkVL1xzQBT3MbHq9JMZvnpVQR02o8E',
      authDomain: 'thread-spinner.firebaseapp.com',
      databaseURL: 'https://thread-spinner.firebaseio.com',
      projectId: 'thread-spinner',
      storageBucket: 'thread-spinner.appspot.com'
    })
    // Auto sign in if session still active
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        // Set local user state
        this.$store.commit('setUser', {
          id: user.uid,
          email: user.email
        })
        // fetch user's data from fb
        this.$store.dispatch('user/fetchUserData', user.uid)
      } else {
        // set an empty user if not logged in
        this.$store.commit('setUser', {})
      }
    })
  }
})
