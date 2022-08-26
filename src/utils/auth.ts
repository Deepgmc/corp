import $api from './api'
import { CORP_AUTH_TOKEN_NAME } from '@/utils/STORAGE_C'

import { ILoginData } from '@/types/StoreTypes'
import { IRegisterData } from '@/types/StoreTypes'
import { IUser } from '@/types/StoreTypes'

const authApi = {

    async login({ login, password }: ILoginData) {
        /**
        withCredentials: true,
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        */

        return $api.post('/auth/auth/login', { login: login, password: password })
            .then(function (response) {
                console.log('LOGIN RESPONSE:', response)
                if (!response.data.authData || !response.data.authData.user) {
                    if(response.data.error){
                        return Promise.reject(response.data)
                    }
                    return Promise.reject({error: true, message: 'Неизвестная ошибка авторизации'})
                }
                return new Promise<IUser>((resolve, reject) => {
                    resolve(response.data.authData.user)
                })
            })
            .catch(function (error) {
                return Promise.reject(error)
            })
    },





    async register({ login, name, password }: IRegisterData) {
        return $api.post('/auth/auth/register', { login: login, name: name, password: password })
            .then(function (response) {
                if (response.data.error) {
                    console.log('REGISTER RESPONSE:', response)
                    return Promise.reject(response.data)
                }
                return Promise.resolve(response.data)
            })
    },


    async getUserInfo(token: string){
        return $api.post('/auth/auth/get_user_info', { token })
            .then(function (response) {
                console.log('getUserInfo response', response)
                if (response.data.error) {
                    return Promise.reject(response.data)
                }
                return Promise.resolve(response.data)
            })
    },




    async logout(token: string, user: IUser) {
        return $api.post('/auth/auth/logout', { token: token, user: user })
            .then(function (response) {
                console.log('LOGOUT RESPONSE:', response)
                return new Promise((resolve, reject) => {
                    resolve(true)
                })
            })
            .catch(function (error) {
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
        return localStorage.getItem(CORP_AUTH_TOKEN_NAME) || null
    },

}


export default authApi