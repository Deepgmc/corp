import axios from 'axios'

const config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const $api = axios.create(config)

const authApi = {

    async login({userLogin, password}){
        return $api.post('/api/auth/login', {userLogin: userLogin, password: password})
            .then(function (response) {
                const { token } = response.data
                //localStorage.setItem('corpUserToken', token)
                return new Promise((resolve, reject) => {
                    resolve(token)
                })
            })
            .catch(function (err) {
                console.log('API Login err', err)
            })
    },

    async register({userLogin, password}){
        return $api.post('/api/auth/register', {userLogin: userLogin, password: password})
            .then(function (response) {
                return new Promise((resolve, reject) => {
                    resolve(token)
                })
            })
            .catch(function (err) {
                console.log('API Register err', err)
            })
    },

    async logout(){
        // return $api.get('/api', {userLogin, password})
        //     .then(function (response) {
        //         localStorage.removeItem('corpUserToken')
        //     })
        //     .catch(function (err) {
        //         console.log('Auth Logout err', err);
        //     })
    }

};

export {
    authApi
};