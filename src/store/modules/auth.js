import authApi from '../../utils/auth.js'

import {
    ACTION_REGISTER,
    ACTION_SHOW_NOTIFICATION,
    FLUSH_REGISTER_ERROR_SUCCEESS,
    SET_LOADING,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_ERROR,
    ACTION_LOGIN,
    ACTION_GET_USER,
    SET_TOKEN,
    ACTION_LOGOUT,
    SET_USER
} from '../../utils/STORE_C'

import {
    ALREADY_LOGINED
} from '../../utils/MESSAGES'


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
        async [ACTION_REGISTER]({state, commit, dispatch, getters}, {login, password}){
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                dispatch(ACTION_SHOW_NOTIFICATION, {type: 'error', message: ALREADY_LOGINED }, { root: true } )
                return
            }
            commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(SET_LOADING)
            const userData = await authApi.register({login, password})
                .then((success) => {
                    console.log('Registered new user: ', success)
                    commit(SET_LOGIN_SUCCESS, success)

                    return {login, password}
                })
                //.then(({login, password}) => {
                    //! NEED LOGIN HERE
                //})
                .catch(function (error) {
                    dispatch(ACTION_SHOW_NOTIFICATION, {type: 'error', message: error.message }, { root: true } )
                    commit(SET_LOGIN_ERROR, error)
                })
        },

        /** LOGIN */
        async [ACTION_LOGIN]({state, commit, dispatch, getters}, {login, password}) {
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                dispatch(ACTION_SHOW_NOTIFICATION, {type: 'error', message: messages.ALREADY_LOGINED }, { root: true } )
                return Promise.reject({error: true, message: messages.ALREADY_LOGINED })
            }
            commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(SET_LOADING)
            const userData = await authApi.login({login, password})
                .then((user) => {
                    commit(SET_TOKEN, user.token)
                    // ?????????????? ???????????????????? ?? ???????????????????????? ?????????? ??????????????????????
                    dispatch(ACTION_GET_USER, {
                        token: user.token
                    })
                })
                .catch(function (error) {
                    console.log('login catch 1');
                    dispatch(ACTION_SHOW_NOTIFICATION, {type: 'error', message: error.message }, { root: true } )
                    commit(SET_LOGIN_ERROR, error)
                })
        },

        /** get user info async */
        async [ACTION_GET_USER]({state, commit, dispatch, getters}, {token}){
            const userData = await authApi.getUserInfo(token)
            if(userData){
                commit(SET_USER, userData)
            }
        },

        /** LOGOUT */
        async [ACTION_LOGOUT]({commit}, {token, user}) {
            const logoutResult = await authApi.logout(token, user)
            if(logoutResult){
                commit(SET_TOKEN, null)
                commit(SET_USER, null)
            }
        }
    },

    mutations: {
        [SET_TOKEN](state, token){
            state.token = token
            /** ???????????? ???????????? ?? localStorage */
            authApi.setToken(token)
        },
        [SET_USER](state, user){
            state.user = user
        },
        [SET_LOGIN_ERROR](state, error) {
            state.isLoading = false
            state.error = error
        },
        [SET_LOGIN_SUCCESS](state, success) {
            state.isLoading = false
            state.success = success
        },
        [SET_LOADING](state){
            state.isLoading = true
        },
        [FLUSH_REGISTER_ERROR_SUCCEESS](state){
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
        GET_LOGIN_SUCCESS: (state) => {return state.success ?? null},
        GET_TOKEN        : (state) => state.token,
        GET_USER         : (state) => {return state.user},
    },
}