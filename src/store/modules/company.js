import $api from '../../utils/api.js'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
    ACTION_SAVE_NEW_DEPARTMENT,
    SET_COMPANY,
    ADD_DEPARTMENT,
    ACTION_GET_USER_COMPANY,
    GET_USER_COMPANY,
    SET_COMPANY_FIELD,
    GET_IS_LOADED,
    SET_LOADED
} from '../../utils/STORE_C'

import utils from '../../utils/utilFunctions'

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
                name: null,
                departments: []
            }
        }
    },

    actions: {

        async [ACTION_SAVE_NEW_DEPARTMENT]({commit, dispatch, getters}, {deptName, companyId}){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewDepartment',
                data      : {
                    deptName,
                    companyId
                }
            })
            .then((res) => {
                commit(ADD_DEPARTMENT, {id: res.data.message.insertId, name: deptName})
                utils.showDefaultMessage(dispatch, 'save_success')
            })
            .catch((error) => {
                console.log('Save department error', error);
                utils.showDefaultMessage(dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_USER_COMPANY_INFO]({state, commit, dispatch}, company){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveUserCompany',
                data      : company
            })
            .then((res) => {
                commit(SET_COMPANY, company)
                utils.showDefaultMessage(dispatch, 'save_success')
            })
            .catch((error) => {
                utils.showDefaultMessage(dispatch, 'save_error')
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
        [ADD_DEPARTMENT](state, newDepartment){
            state.company.departments.push(newDepartment)
        },
        [SET_LOADED](state, status){
            state.isLoaded = status
        },
        [SET_COMPANY_FIELD](state, {field, value}){
            state.company[field] = value
        }
    }
}