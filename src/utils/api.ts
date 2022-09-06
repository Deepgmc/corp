import axios, {AxiosRequestConfig} from 'axios'
import store from '../store/store'
import { CORP_AUTH_TOKEN_NAME } from './STORAGE_C'

import { IAxiosQuery } from '@/types/globalTypes'

import {
    TOKEN_VALIDATION_FAIL,
    INVALID_HTTP_OPERATION
} from './MESSAGES'


const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem(CORP_AUTH_TOKEN_NAME) || 0
    }
}


const $api = axios.create(config)

const sendQuery = async function({
    type,
    moduleName,
    section,
    operation,
    data
}: IAxiosQuery){
    const lowerType = type.toLowerCase()
    const token: string = store.getters['auth/GET_TOKEN']
    if(
        operation !== 'register' && operation !== 'login'
        &&
        (
            !token || (token && !validateToken(token))
        )
    ){
        console.warn(`Api: ${TOKEN_VALIDATION_FAIL}`, token)
        return Promise.reject(`Api: ${TOKEN_VALIDATION_FAIL} ${token}`)
    }
    if(!['post', 'get', 'delete', 'put'].includes(lowerType)){
        return Promise.reject(INVALID_HTTP_OPERATION)
    }

    let getParams = null
    if(lowerType === 'get'){
        /**
            если тип запроса - GET,
            то передаваемые данные запихиваем в гет-параметры,
            а не передаём в body
        */
        getParams = '?' + Object.entries(data).reduce((acc: Array<string>, item) => {
            acc.push(`${item[0]}=${item[1]}`)
            return acc
        }, [])
    }

/*
get<T = any, R = AxiosResponse<T>, D = any>
    (url: string, config?: AxiosRequestConfig<D>): Promise<R>;

post<T = any, R = AxiosResponse<T>, D = any>
    (url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
*/

    return $api[type](`/${moduleName}/${section}/${operation}${getParams ? getParams : ''}`, { token: token, data: data })
        // .catch((error: TError) => {
        //     console.warn('Error in sendQuery: ', error)
        // })
}

const validateToken = function(token: string){
    if(!token) return false
    if(token.length < 40) return false
    return true
}


export default sendQuery