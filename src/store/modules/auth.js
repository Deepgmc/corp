import {authApi} from '../../utils/api'

export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            user: null,
            token: localStorage.getItem('corpUserToken') ?? null,
            error: null
        }
    },

    actions: {
        async LOGIN({state, commit}, {userLogin, password}) {
            if(state.isLoading){
                return
            }
            commit('SET_LOADING')
            const userData = await authApi.login({userLogin, password})
                .then((token) => {
                    commit('SET_TOKEN', token)
                })
                .catch(function (err) {
                    console.log('AUTH Login err', err)
                })
        },

        async LOGOUT({commit}, {token}) {
            await authApi.auth.logout(token)
            commit('SET_TOKEN', null)

        }
    },

    mutations: {
        SET_TOKEN(state, token){
            state.token = token
        },
        SET_USER(state, user){
            state.user = user
        },
        ERROR(state, error) {
            state.isLoading = false
            state.error = error
        },
        SUCCESS(state) {
            state.isLoading = false
            state.error = null
        },
        SET_LOADING(state){
            state.isLoading = true
        }
    },

    getters: {
        IS_AUTHENTICATED: (state) => !!state.token
    },
}