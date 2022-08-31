import store from '../store/modules/user'

export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => lazyLoadView(import('@views/home')),
    meta: {
      authRequired: false,
      title: 'Dashboard' 
    },
   
    
    props: (route) => ({ user: store.state.user || {}}),
    

 },
  {
    path: '/service/airtime',
    name: 'Buy Artime',
    component: () => lazyLoadView(import('@views/service/airtime.vue')),
    meta: {
      authRequired: false,
      title: 'Buy Airtime' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/service/cable',
    name: 'Buy Cable',
    component: () => lazyLoadView(import('@views/service/cable.vue')),
    meta: {
      authRequired: false,
      title: 'Buy Cable' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/api/token',
    name: 'API',
    component: () => lazyLoadView(import('@views/api/token.vue')),
    meta: {
      authRequired: false,
      title: 'API TOKEN' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/deposit-fund/account-details',
    name: 'Fund Wallet',
    component: () => lazyLoadView(import('@views/deposit-fund/account-details.vue')),
    meta: {
      authRequired: false,
      title: 'Fund Wallet' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/convert-comission/commission',
    name: 'Withdraw Commission',
    component: () => lazyLoadView(import('@views/convert-comission/commission.vue')),
    meta: {
      authRequired: false,
      title: 'Convert Commission' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/service/transfer',
    name: 'Fund Transfer',
    component: () => lazyLoadView(import('@views/service/transfer.vue')),
    meta: {
      authRequired: false,
      title: 'Transfer Fund' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/service/bill',
    name: 'Bill Payment',
    component: () => lazyLoadView(import('@views/service/bill.vue')),
    meta: {
      authRequired: false,
      title: 'Bill Payment' 
    },
   
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/service/data',
    name: 'Buy Data',
    component: () => lazyLoadView(import('@views/service/data.vue')),
    meta: {
      authRequired: false,
      title: 'Buy Airtime' 
    },
    
    
    
    props: (route) => ({ user: store.state.user || {}}),
  },
  {
    path: '/payment/payment',
    name: 'Make Payment',
    component: () => lazyLoadView(import('@views/payment/payment.vue')),
    meta: {
      authRequired: false,
      title: 'Make Payment' 
    },
   
  },
  {
    path: '/account/password',
    name: 'Password Settings',
    component: () => lazyLoadView(import('@views/account/password.vue')),
    meta: {
      authRequired: false,
      title: 'Password Settings' 
    },
   
  },
  {
    path: '/account/account',
    name: 'Account profile',
    component: () => lazyLoadView(import('@views/account/account.vue')),
    meta: {
      authRequired: false,
      title: 'Account Profile' 
    },
   
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@views/login')),
   
   
  },
 
  
  {
    path: '/register',
    name: 'register',
    component: () => lazyLoadView(import('@views/register')),
    meta: {
      beforeEnter: (to, from, next) => {
        if(store.getters['authenticated']){
          return next({
            name:'dashboard'
          })
        }
        next()
      },
    },
  },
  {
    path: '/verifyphone',
    name: 'Verify-Number',
    component: () => lazyLoadView(import('@views/auth/verifyphone')),
    meta: {
      beforeEnter: (to, from, next) => {
        if(store.getters['authenticated']){
          return next({
            name:'dashboard'
          })
        }
        next()
      },
    },
  },
  {
    path: '/confirm-account',
    name: 'confirm-account',
    component: () => lazyLoadView(import('@views/confirm')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forget-password',
    name: 'forget-password',
    component: () => lazyLoadView(import('@views/forgetPassword')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/verify',
    name: 'Reset Password',
    component: () => lazyLoadView(import('@views/verify')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut')
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.meta.authRequired
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/_404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@views/_loading').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@views/_timeout').default,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    },
  })
}
