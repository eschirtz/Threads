import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Info from '@/components/pages/Info'
import NewScene from '@/components/pages/NewScene'
import Account from '@/components/pages/Account'

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
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/NewScene',
      name: 'NewScene',
      component: NewScene
    }
  ]
})
