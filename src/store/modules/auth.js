import {authApi} from '../../utils/api'
import actions from '../../utils/ACTIONS'

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
        async ACTION_LOGIN({state, commit}, {userLogin, password}) {
            if(state.isLoading){
                return
            }
            commit(actions.SET_LOADING)
            const userData = await authApi.login({userLogin, password})
                .then((token) => {
                    commit(actions.SET_TOKEN, token)
                })
                .catch(function (err) {
                    console.log('AUTH Login err', err)
                })
        },

        async ACTION_REGISTER({state, commit}, {userLogin, password}){
            if(state.isLoading){
                return
            }
            const userData = await authApi.register({userLogin, password})
                .then(({id}) => {
                    console.log('Registered new user: ', id)
                    return {userLogin, password}
                })
                .then(({userLogin, password}) => {
                    console.log('NEED LOGIN HERE')
                })
                .catch(function (err) {
                    console.log('AUTH Register err', err)
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
        [actions.SET_ERROR](state, error) {
            state.isLoading = false
            state.error = error
        },
        [actions.SET_SUCCESS](state) {
            state.isLoading = false
            state.error = null
        },
        [actions.SET_LOADING](state){
            state.isLoading = true
        }
    },

    getters: {
        IS_AUTHENTICATED: (state) => !!state.token
    },
}