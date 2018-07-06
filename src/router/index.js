import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Info from '@/pages/Info'
import NewScene from '@/pages/NewScene'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/NewScene',
      name: 'NewScene',
      component: NewScene
    }
  ]
})
