import $api from '../../utils/api.js'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
    ACTION_SAVE_NEW_DEPARTMENT,
    ACTION_SAVE_NEW_POSITION,
    SET_COMPANY,
    ADD_DEPARTMENT,
    ADD_POSITION,
    ACTION_GET_USER_COMPANY,
    GET_USER_COMPANY,
    SET_COMPANY_FIELD,
    GET_IS_LOADED,
    SET_LOADED,
    ACTION_SAVE_NEW_EMPLOYEE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
} from '../../utils/STORE_C'

import utils from '../../utils/utilFunctions'

const STORE_MODULE_NAME = 'company'

const companyDummy = {
    name       : null,
    departments: [],
    employee   : [],
}

export default {

    namespaced: true,

    state() {
        return {
            /**
                компания вошедшего юзера
                все остальные сущности - сотрудники, счета и т.п. относятся к этой компании, являются её подсущностями
            */
            isLoaded: false,
            company: companyDummy
        }
    },

    actions: {

        async [ACTION_SAVE_NEW_EMPLOYEE]({commit, dispatch}, employeeData){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewEmployee',
                data      : employeeData
            })
            .then((res) => {
                if(employeeData.isRedacting){
                    commit(UPDATE_EMPLOYEE, {
                        ...employeeData.employee
                    })
                } else {
                    commit(ADD_EMPLOYEE, {
                        ...employeeData.employee,
                        id         : res.data.message.insertId,
                        companyId  : employeeData.companyId,
                        create_time: Math.floor(Date.now() / 1000)
                    })
                }
                utils.showDefaultMessage(dispatch, 'save_success')
            })
            .catch((error) => {
                console.warn('Save department error', error);
                utils.showDefaultMessage(dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_NEW_DEPARTMENT]({commit, dispatch}, {deptName, companyId}){
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

        async [ACTION_SAVE_NEW_POSITION]({commit, dispatch}, {positionName, companyId, departmentId}){
            return $api.sendQuery({
                type      : 'POST',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewPosition',
                data      : {
                    positionName,
                    departmentId,
                    companyId
                }
            })
            .then((res) => {
                commit(ADD_POSITION, {
                    id          : res.data.message.insertId,
                    name        : positionName,
                    departmentId: departmentId,
                    companyId   : companyId
                })
                utils.showDefaultMessage(dispatch, 'save_success')
            })
            .catch((error) => {
                console.log('Save position error', error);
                utils.showDefaultMessage(dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_USER_COMPANY_INFO]({commit, dispatch}, company){
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

        async [ACTION_GET_USER_COMPANY]({commit, dispatch, rootGetters}, {}){
            return $api.sendQuery({
                type      : 'GET',
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'getUserCompany',
                data      : {}
            })
            .then((res) => {
                if(res.data && res.data.company){
                    console.info('GetUserCompany:', res.data.company);
                    commit(SET_COMPANY, res.data.company)
                    commit(SET_LOADED, true)
                } else if(rootGetters['auth/IS_AUTHENTICATED']) {
                    if(res.data.error){
                        Promise.reject(res.data.message)
                        utils.showDefaultMessage(dispatch, 'save_error', res.data.message)
                    }
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
            if(typeof company.departments === 'undefined') company = companyDummy
            state.company = company
        },
        [ADD_DEPARTMENT](state, newDepartment){
            state.company.departments.push(newDepartment)
        },
        [ADD_POSITION](state, newPosition){
            state.company.positions.push(newPosition)
        },
        [ADD_EMPLOYEE](state, newEmployee){
            state.company.employees.push(newEmployee)
        },
        [UPDATE_EMPLOYEE](state, employee){
            let i
            state.company.employees.find((emp, index) => {
                i = index
                return emp.id === employee.id
            })
            state.company.employees.splice(i, 1, employee)
        },
        [SET_LOADED](state, status){
            state.isLoaded = status
        },
        [SET_COMPANY_FIELD](state, {field, value}){
            state.company[field] = value
        }
    }
}