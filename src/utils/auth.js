import $api from './api'
import { CORP_AUTH_TOKEN_NAME } from './STORAGE_C'

const authApi = {

    /**
        запрашивает сервер на авторизованность пользователя
        только при наличии токена
        по факту это просто проверка валидности и времени действия токена
    */
    async isAuthenticated(){

    },

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
                if (!response.data.authData.user) {
                    throw new Error('Invalid auth/login response')
                }
                const token = response.data.authData.user.token
                return new Promise((resolve, reject) => {
                    resolve(token)
                })
            })
            .catch(function (error) {
                console.error('API Login err', error)
            })
    },





    async register({ login, password }) {
        return $api.post('/auth/auth/register', { login: login, password: password })
            .then(function (response) {
                if (response.data.error) {
                    console.log('REGISTER RESPONSE:', response)
                    return Promise.reject(response.data)
                }
                console.log('Register promise ok', response)
                return Promise.resolve(response.data)
            })
    },




    async logout() {
        // return $api.get('/auth', {login, password})
        //     .then(function (response) {
        //         localStorage.removeItem('corpUserToken')
        //     })
        //     .catch(function (err) {
        //         console.log('Auth Logout err', err);
        //     })
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
        return localStorage.getItem(CORP_AUTH_TOKEN_NAME)
    },

}


export default authApi