import { createStore } from 'vuex'
import auth from './modules/auth.js'
import company from './modules/company.js'
import {
    SET_NOTIFICATION
} from '../utils/STORE_C.js'
import store_actions from './store_actions.js'

export default createStore({
    state: {
        notification: null,
    },

    getters: {
        GET_NOTIFICATION: (state) => state.notification ?? null,
    },

    mutations: {
        [SET_NOTIFICATION](state, notification){
            state.notification = notification
        },
    },

    actions: store_actions,

    modules: {
        auth,
        company
    },

    strict: process.env.NODE_ENV !== 'production',
})
