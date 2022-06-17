import { createStore } from 'vuex'
import auth from './modules/auth.js'

export default createStore({
  state: {
      //clickedMenu: 'home'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: auth
  },
  strict: process.env.NODE_ENV !== 'production',
})
