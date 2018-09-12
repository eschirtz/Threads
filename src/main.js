import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Lottie from 'vue-lottie'
import Alert from '@/components/shared/ts-alert.vue'
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
Vue.component('lottie', Lottie)
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
      storageBucket: 'gs://thread-spinner.appspot.com'
    })
    // Auto sign in if session still active
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Fetch user's data from fb
        this.$store.dispatch('user/fetchState', user.uid)
      } else {
        // Set an empty user if not logged in
        this.$store.commit('unsetUser')
      }
    })
  }
})
