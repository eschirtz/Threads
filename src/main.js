import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Overide Theme
Vue.use(Vuetify, {
  theme: {
    primary: '#789f89',
    secondary: '#0a373a', //
    accent: '#e3d9a2', //
    error: '#e0694e', //
    info: '#048384', //
    success: '#5f7200', //
    warning: '#deb853' //
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
