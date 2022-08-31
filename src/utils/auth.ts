import sendQuery from './api'
import { AxiosResponse } from 'axios'
import { CORP_AUTH_TOKEN_NAME } from '@/utils/STORAGE_C'

import { ILoginData } from '@/types/StoreTypes'
import { IRegisterData } from '@/types/StoreTypes'
import { IUser } from '@/types/StoreTypes'
import { TError, requestTypes } from '@/types/globalTypes'
const STORE_MODULE_NAME = 'auth'
const authApi = {

    async login({ login, password }: ILoginData) {
        /**
        withCredentials: true,
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        */
        return sendQuery({
            type      : requestTypes.post,
            moduleName: 'auth',
            section   : STORE_MODULE_NAME,
            operation : 'login',
            data      : { login: login, password: password }
        })
        .then((response: AxiosResponse) => {
            console.log('LOGIN RESPONSE:', response)
            if (!response.data.authData || !response.data.authData.user) {
                if(response.data.error){
                    return Promise.reject(response.data)
                }
                return Promise.reject({error: true, message: 'Неизвестная ошибка авторизации'})
            }
            return new Promise<IUser>((resolve) => {
                resolve(response.data.authData.user)
            })
        })
        .catch(function (error: TError) {
            return Promise.reject(error)
        })
    },


    async register({ login, name, password }: IRegisterData) {
        return sendQuery({
            type      : requestTypes.post,
            moduleName: 'auth',
            section   : STORE_MODULE_NAME,
            operation : 'register',
            data      : { login: login, name: name, password: password }
        })
        .then((response: AxiosResponse) => {
            if (response.data.error) {
                console.log('REGISTER RESPONSE:', response)
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        })
    },


    async getUserInfo(token: string){
        return sendQuery({
            type      : requestTypes.post,
            moduleName: 'auth',
            section   : STORE_MODULE_NAME,
            operation : 'get_user_info',
            data      : { token }
        })
        .then((response: AxiosResponse) => {
            console.log('getUserInfo response', response)
            if (response.data.error) {
                return Promise.reject(response.data)
            }
            return Promise.resolve(response.data)
        })
    },




    async logout(token: string /*, user: IUser*/) {
        return sendQuery({
            type      : requestTypes.post,
            moduleName: 'auth',
            section   : STORE_MODULE_NAME,
            operation : 'logout',
            data      : { token }
        })
        .then((response: AxiosResponse) => {
            console.log('LOGOUT RESPONSE:', response)
            return new Promise((resolve) => {
                resolve(true)
            })
        })
        .catch(function (error: TError) {
            console.error('API Login err', error)
        })
    },


    /*
        устанавливает токен юзера в стор
        предполагается, что токен разный для каждой сессии
    */
    setToken(token: string){
        localStorage.setItem(CORP_AUTH_TOKEN_NAME, token)
        return true
    },

    getToken(){
        return localStorage.getItem(CORP_AUTH_TOKEN_NAME) || ''
    },

}


export default authApi