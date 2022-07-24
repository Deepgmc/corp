import $api from '../../utils/api.js'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
    SET_COMPANY,
    ACTION_GET_USER_COMPANY,
    GET_USER_COMPANY,
    SET_COMPANY_FIELD,
    ACTION_SHOW_NOTIFICATION,
    GET_IS_LOADED,
    SET_LOADED
} from '../../utils/STORE_C'

import {
    SAVE_SUCCESS,
    SAVE_ERROR
} from '../../utils/MESSAGES'

const STORE_MODULE_NAME = 'company'

export default {

    namespaced: true,

    state() {
        return {
            /**
                компания вошедшего юзера
                все остальные сущности - сотрудники, счета и т.п. относятся к этой компании, являются её подсущностями
            */
            isLoaded: false,
            company: {
                name: null
            }
        }
    },

    actions: {

        async [ACTION_SAVE_USER_COMPANY_INFO]({state, commit, dispatch, getters}, company){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveUserCompany',
                data      : company
            })
            .then((res) => {
                commit(SET_COMPANY, company)
                dispatch(ACTION_SHOW_NOTIFICATION, {type: 'success', message: SAVE_SUCCESS }, { root: true } )
                console.log('res', res)
            })
            .catch((error) => {
                dispatch(ACTION_SHOW_NOTIFICATION, {type: 'error', message: SAVE_ERROR }, { root: true } )
                console.log('error', error)
            })
        },

        async [ACTION_GET_USER_COMPANY]({state, commit, dispatch, getters}, {}){
            return $api.sendQuery({
                type      : 'GET',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'getUserCompany',
                data      : {}
            })
            .then((res) => {
                if(res.data.company){
                    commit(SET_COMPANY, res.data.company)
                    commit(SET_LOADED, true)
                } else {
                    Promise.reject('Компания не найдена')
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
        },

    },

    getters: {
        [GET_USER_COMPANY]: (state) => {
            return state.company ?? null
        },
        [GET_IS_LOADED]: (state) => {
            return state.isLoaded
        },
    },

    mutations: {
        [SET_COMPANY](state, company){
            state.company = company
        },
        [SET_LOADED](state, status){
            state.isLoaded = status
        },
        [SET_COMPANY_FIELD](state, {field, value}){
            state.company[field] = value
        }
    }
}