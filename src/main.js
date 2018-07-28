import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
// styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

// Overide Theme
Vue.use(Vuetify, {
  theme: {
    primary: '#e0694e',
    secondary: '#e3d9a2', //
    accent: '#048384', //
    error: '#aa0000', //
    warning: '#efc953', //
    success: '#5f9400' //
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
