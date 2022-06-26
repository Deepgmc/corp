import authApi from '../../utils/auth.js'
import actions from '../../utils/ACTIONS_C'


export default {
    namespaced: true,
    state() {
        return {
            isLoading: false,
            user     : null,
            token    : authApi.getToken() ?? null,
            error    : null,
            success  : null
        }
    },

    actions: {

        async ACTION_REGISTER({state, commit}, {login, password}){
            if(state.isLoading){
                return
            }
            commit(actions.FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(actions.SET_LOADING)
            const userData = await authApi.register({login, password})
                .then((success) => {
                    console.log('Registered new user: ', success)
                    commit(actions.SET_LOGIN_SUCCESS, success)

                    return {login, password}
                })
                //.then(({login, password}) => {
                    //! NEED LOGIN HERE
                //})
                .catch(function (error) {
                    commit(actions.SET_LOGIN_ERROR, error)
                })
        },

        async ACTION_LOGIN({state, commit}, {login, password}) {
            if(state.isLoading){
                return
            }
            commit(actions.FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(actions.SET_LOADING)
            const userData = await authApi.login({login, password})
                .then((token) => {
                    commit(actions.SET_TOKEN, token)
                })
                .catch(function (error) {
                    console.log('AUTH Login err', error)
                })
        },

        async LOGOUT({commit}, {token}) {
            await authApi.auth.logout(token)
            commit(actions.SET_TOKEN, null)

        }
    },

    mutations: {
        [actions.SET_TOKEN](state, token){
            state.token = token
            authApi.setToken(token)
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
        },
        [actions.FLUSH_REGISTER_ERROR_SUCCEESS](state){
            state.success = null
            state.error = null
        }
    },

    getters: {
        IS_AUTHENTICATED: (state) => {
            return !!state.token || !!authApi.getToken()
        },
        GET_LOGIN_ERROR: (state) => state.error ?? null,
        GET_LOGIN_SUCCESS: (state) => state.success ?? null
    },
}