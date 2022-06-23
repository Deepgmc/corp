import axios from 'axios'


const config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const $api = axios.create(config)

const authApi = {

    async login({login, password}){
        return $api.post('/api/auth/login', {login: login, password: password})
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





    async register({login, password}){
        return $api.post('/api/auth/register', {login: login, password: password})
            .then(function (response) {
                if(response.data.error){
                    console.log('RESPONSE:', response)
                    return Promise.reject(response.data)
                }
                console.log('Register promise ok', response)
                return Promise.resolve(response.data)
            })
    },




    async logout(){
        // return $api.get('/api', {login, password})
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