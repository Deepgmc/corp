import {authApi} from '../../utils/api'
import actions from '../../utils/ACTIONS'

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            user     : null,
            //token    : localStorage.getItem('corpUserToken') ?? null,
            error    : null,
            success  : null
        }
    },

    actions: {
        // async ACTION_LOGIN({state, commit}, {login, password}) {
        //     if(state.isLoading){
        //         return
        //     }
        //     commit(actions.SET_LOADING)
        //     const userData = await authApi.login({login, password})
        //         .then((token) => {
        //             commit(actions.SET_TOKEN, token)
        //         })
        //         .catch(function (err) {
        //             console.log('AUTH Login err', err)
        //         })
        // },

        async ACTION_REGISTER({state, commit}, {login, password}){
            if(state.isLoading){
                return
            }
            const userData = await authApi.register({login, password})
                .then((success) => {
                    console.log('Registered new user: ', success)
                    commit(actions.SET_LOGIN_SUCCESS, success)
                    return {login, password}
                })
                .then(({login, password}) => {
                    //! NEED LOGIN HERE
                    //! https://www.youtube.com/watch?v=jkQdEvPf-uI&list=PLNOjHC_BXrfCNWe0ghCxEmNVeHN_J5K3k&index=3
                    //! 38:43
                })
                .catch(function (error) {
                    commit(actions.SET_LOGIN_ERROR, error)
                })
            commit(actions.SET_LOADING)
        },

        async LOGOUT({commit}, {token}) {
            await authApi.auth.logout(token)
            commit(actions.SET_TOKEN, null)

        }
    },

    mutations: {
        [actions.SET_TOKEN](state, token){
            state.token = token
        },
        [actions.SET_USER](state, user){
            state.user = user
        },
        [actions.SET_LOGIN_ERROR](state, error) {
            state.isLoading = false
            state.error = error
        },
        [actions.SET_LOGIN_SUCCESS](state, success) {
            state.isLoading = false
            state.success = success
        },
        [actions.SET_LOADING](state){
            state.isLoading = true
        }
    },

    getters: {
        IS_AUTHENTICATED: (state) => !!state.token,
        GET_LOGIN_ERROR: (state) => state.error ?? null,
        GET_LOGIN_SUCCESS: (state) => state.success ?? null
    },
}