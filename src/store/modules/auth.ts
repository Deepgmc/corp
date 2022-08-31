
import authApi from '@/utils/auth'
import sendQuery from '@/utils/api'
import router from '@/router/router'

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
    ACTION_SAVE_PROFILE_INFO,
    ACTION_CHECK_USER_AUTH
} from '@/utils/STORE_C'

import { ALREADY_LOGINED } from '@/utils/MESSAGES'
import utils from '@/utils/utilFunctions'
import { AxiosResponse } from 'axios'

import { ILoginData, IAuthState, IRegisterData, IUser } from '@/types/StoreTypes'
import { requestTypes } from '@/types/globalTypes'
import { StoreFn } from '@/types/StoreTypes'

const STORE_MODULE_NAME = 'auth'

export default {

    namespaced: true,

    state() : IAuthState {
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
        async [ACTION_REGISTER]<T extends StoreFn, D extends IRegisterData>(storeFn: T, data: D) {
            if (storeFn.state.isLoading) {
                return
            }
            if (storeFn.getters.IS_AUTHENTICATED) {
                utils.showDefaultMessage(storeFn.dispatch, 'login_error')
                return
            }
            storeFn.commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            storeFn.commit(SET_LOADING)
            await authApi.register({ login: data.login, name: data.name, password: data.password })
                .then((response: AxiosResponse) => {
                    console.log('Registered new user: ', response)
                    utils.showDefaultMessage(storeFn.dispatch, 'login_success', response.data.message.message)
                    storeFn.commit(SET_LOGIN_SUCCESS, response)

                    return {
                        login   : data.login,
                        password: data.password
                    }
                })
                .catch(function (error) {
                    utils.showDefaultMessage(storeFn.dispatch, 'register_error', error.message)
                    storeFn.commit(SET_LOGIN_ERROR, error)
                })
        },

        /** LOGIN */
        async [ACTION_LOGIN]<T extends StoreFn, D extends ILoginData>(storeFn: T, data: D) {
            if (storeFn.state.isLoading) {
                return
            }
            if (storeFn.getters.IS_AUTHENTICATED) {
                utils.showDefaultMessage(storeFn.dispatch, 'login_error')
                return Promise.reject({ error: true, message: ALREADY_LOGINED })
            }
            storeFn.commit(FLUSH_REGISTER_ERROR_SUCCEESS)
            storeFn.commit(SET_LOADING)
            await authApi.login({ login: data.login, password: data.password })
                .then((user: IUser) => {
                    storeFn.commit(SET_TOKEN, user.token)
                    // Возьмём информацию о пользователе после авторизации
                    storeFn.dispatch(ACTION_GET_USER, {
                        token: user.token
                    })
                })
                .catch(function (error) {
                    utils.showDefaultMessage(storeFn.dispatch, 'login_error', error.message)
                    storeFn.commit(SET_LOGIN_ERROR, error)
                })
        },

        /** get user info async */
        async [ACTION_GET_USER]<T extends StoreFn>(storeFn: T, token: string) {
            const userData = await authApi.getUserInfo(token)
            if (userData) {
                storeFn.commit(SET_USER, userData)
            }
        },

        /** LOGOUT */
        async [ACTION_LOGOUT]<T extends StoreFn>(storeFn: T, { token/*, user*/ }: {token: string, user: IUser}) {
            const logoutResult = await authApi.logout(token/*, user*/)
            if (logoutResult) {
                storeFn.commit(SET_TOKEN, null)
                storeFn.commit(SET_USER, null)
            }
        },

        async [ACTION_SAVE_PROFILE_INFO]<T extends StoreFn>(storeFn: T, { newUser }: { newUser: IUser}) {
            return sendQuery({
                type      : requestTypes.post,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveUserProfile',
                data      : { user: newUser }
            })
                .then((res: AxiosResponse) => {
                    storeFn.commit(SET_USER, newUser)
                    utils.showDefaultMessage(storeFn.dispatch, 'login_success', res.data.message.message)
                })
                .catch(() => {
                    utils.showDefaultMessage(storeFn.dispatch, 'save_error')
                })
        },

        async [ACTION_CHECK_USER_AUTH]<T extends StoreFn>(storeFn: T) {
            return sendQuery({
                type      : requestTypes.get,
                moduleName: 'auth',
                section   : STORE_MODULE_NAME,
                operation : 'checkUserAuth',
                data      : { token: storeFn.getters.GET_TOKEN }
            })
                .then((res: AxiosResponse) => {
                    let needToLogout = res.data.error
                    if (!needToLogout) {
                        needToLogout = res.data.foundUser
                    }
                    if (needToLogout) {
                        storeFn.commit('auth/SET_TOKEN', null)
                        router.push({ name: 'login' })
                    }
                })
                .catch((error) => {
                    console.log('err', error);
                })
        }
    },

    mutations: {
        [SET_TOKEN](state: IAuthState, token: string) : void {
            state.token = token
            /** запись токена в localStorage */
            authApi.setToken(token)
        },
        [SET_USER](state: IAuthState, user: IUser) : void {
            state.user = user
        },
        [SET_LOGIN_ERROR](state: IAuthState, error: string) : void {
            state.isLoading = false
            state.error = error
        },
        [SET_LOGIN_SUCCESS](state: IAuthState, success: string) :void {
            state.isLoading = false
            state.success = success
        },
        [SET_LOADING](state: IAuthState) : void {
            state.isLoading = true
        },
        [FLUSH_REGISTER_ERROR_SUCCEESS](state: IAuthState) : void {
            state.success = null
            state.error = null
        },
        // [SET_USER_FIELD](state: IAuthState, { field, value }) {
        //     state.user[field] = value
        // },
    },

    getters: {
        IS_AUTHENTICATED: (state: IAuthState) : boolean => {
            const token = state.token
            //TODO
            /**
            Добавить синхронизацию с сервером + удаление просроченных токенов
            */
            return !!token && token.length > 30
        },
        GET_LOGIN_ERROR: (state: IAuthState) => state.error ?? null,
        GET_LOGIN_SUCCESS: (state: IAuthState) => { return state.success ?? null },
        GET_TOKEN: (state: IAuthState) => {
            if (state.token === 'null' || state.token === 'undefined') return false
            return state.token
        },
        GET_USER: (state: IAuthState) => { return state.user },
    },
}