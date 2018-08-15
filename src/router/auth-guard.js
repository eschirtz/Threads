import store from '@/store'
export default (to, from, next) => {
  if (store.getters['user/isAuthenticated']) {
    next()
  } else {
    next('/signin')
  }
}
