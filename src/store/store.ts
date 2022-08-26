import { createStore, StoreOptions } from 'vuex'

import auth from '@/store/modules/auth'
import company from '@/store/modules/company'

import {
    SET_NOTIFICATION
} from '@/utils/STORE_C'

import store_actions from './store_actions'
import { RootState } from '@/types/StoreTypes'

export default createStore<RootState>({
    state: {
        notification: {}
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