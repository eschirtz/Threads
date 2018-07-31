import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
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
      name: 'THREADS',
      component: Home
    },
    {
      path: '/account',
      name: 'Account - THREADS',
      component: Account,
      beforeEnter: AuthGuard
    },
    {
      path: '/edit/:id',
      name: 'Editor - THREADS',
      component: SceneEditor
    },
    {
      path: '/signup',
      name: 'Sign Up - THREADS',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'Sign In - THREADS',
      component: SignIn
    }

  ]
})
