import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/AuthView.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "home" */ '../views/IndexView.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !store.getters['auth/IS_AUTHENTICATED']){
    next('/login')
  } else {
    next()
  }
})

export default router
