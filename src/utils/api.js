import axios from 'axios'
import store from '../store/store.js'
import { CORP_AUTH_TOKEN_NAME } from './STORAGE_C'

import {
    TOKEN_VALIDATION_FAIL,
    INVALID_HTTP_OPERATION
} from './MESSAGES'

const config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem(CORP_AUTH_TOKEN_NAME) || null
    }
}

const $api = axios.create(config)

// POST, /auth/auth/login, {data}
$api.sendQuery = async function({
    type,
    moduleName,
    section,
    operation,
    data
}){
    type = type.toLowerCase()
    const token = store.getters['auth/GET_TOKEN']
    if(!validateToken(token)){
        console.warn(`Api: ${TOKEN_VALIDATION_FAIL}`, token)
        return Promise.reject(`Api: ${TOKEN_VALIDATION_FAIL} ${token}`)
    }
    if(!['post', 'get', 'delete', 'put'].includes(type)){
        return Promise.reject(INVALID_HTTP_OPERATION)
    }

    let getParams = null
    if(type === 'get'){
        /**
            если тип запроса - GET,
            то передаваемые данные запихиваем в гет-параметры,
            а не передаём в body
        */
        getParams = '?' + Object.entries(data).reduce((acc, item) => {
            acc.push(`${item[0]}=${item[1]}`)
            return acc
        }, [])
    }

    return await $api[type](`/${moduleName}/${section}/${operation}${getParams ? getParams : ''}`, { token: token, data: data })
        .catch(error => {
            console.warn('Error in sendQuery: ', error)
        })
        // .then(function (response) {
        //     console.log('LOGOUT RESPONSE:', response)
        //     return new Promise((resolve, reject) => {
        //         resolve(true)
        //     })
        // })
        // .catch(function (error) {
        //     console.error('API Login err', error)
        // })
    //const logoutResult = await authApi.logout(token, user)
}

const validateToken = function(token){
    if(!token) return false
    if(token.length < 40) return false
    return true
}


export default $api