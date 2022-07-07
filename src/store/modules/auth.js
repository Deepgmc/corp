import authApi from '../../utils/auth.js'
import actions from '../../utils/STORE_C'
import messages from '../../utils/MESSAGES'


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

        /** REGISTER */
        async ACTION_REGISTER({state, commit, dispatch, getters}, {login, password}){
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                dispatch(actions.ACTION_SHOW_NOTIFICATION, {type: 'error', message: messages.ALREADY_LOGINED }, { root: true } )
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
                    dispatch(actions.ACTION_SHOW_NOTIFICATION, {type: 'error', message: error.message }, { root: true } )
                    commit(actions.SET_LOGIN_ERROR, error)
                })
        },

        /** LOGIN */
        async ACTION_LOGIN({state, commit, dispatch, getters}, {login, password}) {
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                dispatch(actions.ACTION_SHOW_NOTIFICATION, {type: 'error', message: messages.ALREADY_LOGINED }, { root: true } )
                return Promise.reject({error: true, message: messages.ALREADY_LOGINED })
            }
            commit(actions.FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(actions.SET_LOADING)
            const userData = await authApi.login({login, password})
                .then((token) => {
                    console.log('login then 1');
                    commit(actions.SET_TOKEN, token)
                    commit(actions.SET_USER, {login: login, token: token})
                })
                .catch(function (error) {
                    console.log('login catch 1');
                    dispatch(actions.ACTION_SHOW_NOTIFICATION, {type: 'error', message: error.message }, { root: true } )
                    commit(actions.SET_LOGIN_ERROR, error)
                })
        },

        /** LOGOUT */
        async ACTION_LOGOUT({commit}, {token, user}) {
            const logoutResult = await authApi.logout(token, user)
            if(logoutResult){
                commit(actions.SET_TOKEN, null)
                commit(actions.SET_USER, null)
            }
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
            const token = state.token
            return !!token && token.length > 30
        },
        GET_LOGIN_ERROR  : (state) => state.error ?? null,
        GET_LOGIN_SUCCESS: (state) => state.success ?? null,
        GET_TOKEN        : (state) => state.token,
        GET_USER         : (state) => {return state.user},
    },
}