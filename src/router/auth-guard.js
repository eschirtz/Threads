import store from '@/store'
export default (to, from, next) => {
  if (store.getters.userIsAuthenticated) {
    next()
  } else {
    next('/signin')
  }
}
