import { createStore } from 'vuex'
import auth from './modules/auth.js'
import { notify } from '@kyvg/vue3-notification';
import actions from '../utils/STORE_C'

export default createStore({
    state: {
        notification: null
    },

    getters: {
        GET_NOTIFICATION: (state) => state.notification ?? null,
    },

    mutations: {
        [actions.SET_NOTIFICATION](state, notification){
            state.notification = notification
        },
    },

    actions: {
        ACTION_SHOW_NOTIFICATION({state, commit}, {type, message}) {
            let title = ''
            switch(type){
                case 'error'        : title = 'Внимание!'; break
                case 'success'      : title = ''; break
                case 'info'         : title = 'Информация!'; break
                default             : title = 'Информация!'; break
            }
            notify({
                title   : title,
                text    : message,
                max     : 1,
                type    : type
            })
        }
    },

    modules: {
        auth: auth
    },

    strict: process.env.NODE_ENV !== 'production',
})
