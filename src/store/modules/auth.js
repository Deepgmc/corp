import authApi from '../../utils/auth.js'
import $api from '../../utils/api.js'
import router from '../../router/router.js'

import {
    ACTION_REGISTER,
    FLUSH_REGISTER_ERROR_SUCCEESS,
    SET_LOADING,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_ERROR,
    ACTION_LOGIN,
    ACTION_GET_USER,
    SET_TOKEN,
    ACTION_LOGOUT,
    SET_USER,
    SET_USER_FIELD,
    ACTION_SAVE_PROFILE_INFO,
    ACTION_CHECK_USER_AUTH
} from '../../utils/STORE_C'


import utils from '../../utils/utilFunctions'

const STORE_MODULE_NAME = 'auth'

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
        async [ACTION_REGISTER]({state, commit, dispatch, getters}, {login, name, password}){
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                utils.showDefaultMessage(dispatch, 'login_error')
                return
            }
            commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(SET_LOADING)
            await authApi.register({login, name, password})
                .then((success) => {
                    console.log('Registered new user: ', success)
                    utils.showDefaultMessage(dispatch, 'login_success', success.message)
                    commit(SET_LOGIN_SUCCESS, success)

                    return {login, password}
                })
                //.then(({login, password}) => {
                    //TODO NEED LOGIN HERE
                //})
                .catch(function (error) {
                    utils.showDefaultMessage(dispatch, 'register_error', error.message)
                    commit(SET_LOGIN_ERROR, error)
                })
        },

        /** LOGIN */
        async [ACTION_LOGIN]({state, commit, dispatch, getters}, {login, password}) {
            if(state.isLoading){
                return
            }
            if(getters.IS_AUTHENTICATED){
                utils.showDefaultMessage(dispatch, 'login_error')
                return Promise.reject({error: true, message: messages.ALREADY_LOGINED })
            }
            commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            commit(SET_LOADING)
            const userData = await authApi.login({login, password})
                .then((user) => {
                    commit(SET_TOKEN, user.token)
                    // Возьмём информацию о пользователе после авторизации
                    dispatch(ACTION_GET_USER, {
                        token: user.token
                    })
                })
                .catch(function (error) {
                    utils.showDefaultMessage(dispatch, 'login_error', error.message)
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
        },

        async [ACTION_SAVE_PROFILE_INFO]({commit, dispatch}, {newUser, settings}){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveUserProfile',
                data      : {user: newUser, settings: settings}
            })
            .then((res) => {
                commit(SET_USER, newUser)
                utils.showDefaultMessage(dispatch, 'login_success', res.data.message)
            })
            .catch((error) => {
                utils.showDefaultMessage(dispatch, 'save_error')
            })
        },

        async [ACTION_CHECK_USER_AUTH]({state, commit, dispatch, getters}) {
            return $api.sendQuery({
                type      : 'GET',
                moduleName: 'auth',
                section   : STORE_MODULE_NAME,
                operation : 'checkUserAuth',
                data      : {token: getters.GET_TOKEN}
            })
            .then((res) => {
                let needToLogout = res.data.error
                if(!needToLogout){
                    needToLogout = !res.data.foundUser
                }
                if(needToLogout){
                    this.commit('auth/SET_TOKEN', null)
                    router.push({name: 'login'})
                }
            })
            .catch((error) => {
                console.log('err', error);
            })
        }
    },

    mutations: {
        [SET_TOKEN](state, token){
            state.token = token
            /** запись токена в localStorage */
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
        },
        [SET_USER_FIELD](state, {field, value}){
            state.user[field] = value
        },
    },

    getters: {
        IS_AUTHENTICATED: (state) => {
            const token = state.token
            //TODO
            /**
            Добавить синхронизацию с сервером + удаление просроченных токенов
            */
            return !!token && token.length > 30
        },
        GET_LOGIN_ERROR  : (state) => state.error ?? null,
        GET_LOGIN_SUCCESS: (state) => {return state.success ?? null},
        GET_TOKEN        : (state) => {
            if(state.token === 'null' || state.token === 'undefined') return false
            return state.token
        },
        GET_USER         : (state) => {return state.user},
    },
}