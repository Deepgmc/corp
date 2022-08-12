import $api from './api'
import { CORP_AUTH_TOKEN_NAME } from './STORAGE_C'


const authApi = {

    /**
        запрашивает сервер на авторизованность пользователя
        только при наличии токена
        по факту это просто проверка валидности и времени действия токена
    */
    // async isAuthenticated(){

    // },

    async login({ login, password }) {
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
                return new Promise((resolve, reject) => {
                    resolve(response.data.authData.user)
                })
            })
            .catch(function (error) {
                return Promise.reject(error)
            })
    },





    async register({ login, name, password }) {
        return $api.post('/auth/auth/register', { login: login, name: name, password: password })
            .then(function (response) {
                if (response.data.error) {
                    console.log('REGISTER RESPONSE:', response)
                    return Promise.reject(response.data)
                }
                return Promise.resolve(response.data)
            })
    },


    async getUserInfo(token){
        return $api.post('/auth/auth/get_user_info', { token })
            .then(function (response) {
                console.log('getUserInfo response', response)
                if (response.data.error) {
                    return Promise.reject(response.data)
                }
                return Promise.resolve(response.data)
            })
    },




    async logout(token, user) {
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
    setToken(token){
        localStorage.setItem(CORP_AUTH_TOKEN_NAME, token)
        return true
    },

    getToken(){
        return localStorage.getItem(CORP_AUTH_TOKEN_NAME) || null
    },

}


export default authApi