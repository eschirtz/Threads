import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Info from '@/components/pages/Info'
import SceneEditor from '@/components/pages/SceneEditor'
import Account from '@/components/pages/Account'
import SignUp from '@/components/pages/SignUp'
import SignIn from '@/components/pages/SignIn'
import AuthGuard from './auth-guard'

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
      component: Account,
      beforeEnter: AuthGuard
    },
    {
      path: '/edit/:id',
      name: 'Scene Editor',
      component: SceneEditor
    },
    {
      path: '/signup',
      name: 'Sign Up',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'Sign In',
      component: SignIn
    }

  ]
})
