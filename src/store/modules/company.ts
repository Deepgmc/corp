import sendQuery from '@/utils/api'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
    ACTION_SAVE_NEW_DEPARTMENT,
    ACTION_SAVE_NEW_POSITION,
    SET_COMPANY,
    ADD_DEPARTMENT,
    ADD_POSITION,
    ACTION_GET_USER_COMPANY,
    GET_USER_COMPANY,
    GET_IS_LOADED,
    SET_LOADED,
    ACTION_SAVE_NEW_EMPLOYEE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
} from '@/utils/STORE_C'

import utils from '@/utils/utilFunctions'

import { AxiosResponse } from 'axios'

const STORE_MODULE_NAME = 'company'

import {
    ICompanyState,
    ICompany,
    IEmployee,
    IDepartment,
    IPosition,
    IEmp,
    StoreFn
} from '@/types/StoreTypes'

import { requestTypes } from '@/types/globalTypes'

const companyDummy: ICompany = {
    name       : '',
    departments: [],
    employees  : [],
    positions  : [],
    address    : '',
    id         : null
}

export default {

    namespaced: true,

    state(): ICompanyState {
        return {
            /**
                компания вошедшего юзера
                все остальные сущности - сотрудники, счета и т.п. относятся к этой компании, являются её подсущностями
            */
            isLoaded: false,
            company : companyDummy
        }
    },

    actions: {

        async [ACTION_SAVE_NEW_EMPLOYEE]<T extends StoreFn>(storeFn: T, employeeData: IEmployee){
            return sendQuery({
                type      : requestTypes.post,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewEmployee',
                data      : employeeData
            })
            .then((res: AxiosResponse) => {
                if(employeeData.isRedacting){
                    storeFn.commit(UPDATE_EMPLOYEE, {
                        ...employeeData.employee
                    })
                } else {
                    storeFn.commit(ADD_EMPLOYEE, {
                        ...employeeData.employee,
                        id         : res.data.message.insertId,
                        companyId  : employeeData.employee.companyId,
                        create_time: Math.floor(Date.now() / 1000)
                    })
                }
                utils.showDefaultMessage(storeFn.dispatch, 'save_success')
            })
            .catch((error) => {
                console.warn('Save department error', error);
                utils.showDefaultMessage(storeFn.dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_NEW_DEPARTMENT]<T extends StoreFn>(storeFn: T, {deptName, companyId}: {deptName: string, companyId: number}){
            return sendQuery({
                type      : requestTypes.post,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewDepartment',
                data      : {
                    deptName,
                    companyId
                }
            })
            .then((res: AxiosResponse) => {
                storeFn.commit(ADD_DEPARTMENT, {id: res.data.message.insertId, name: deptName})
                utils.showDefaultMessage(storeFn.dispatch, 'save_success')
            })
            .catch((error) => {
                console.log('Save department error', error);
                utils.showDefaultMessage(storeFn.dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_NEW_POSITION]<T extends StoreFn>(storeFn: T, {positionName, companyId, departmentId}: {positionName: string, companyId: number, departmentId: number}){
            return sendQuery({
                type      : requestTypes.post,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveNewPosition',
                data      : {
                    positionName,
                    departmentId,
                    companyId
                }
            })
            .then((res: AxiosResponse) => {
                storeFn.commit(ADD_POSITION, {
                    id          : res.data.message.insertId,
                    name        : positionName,
                    departmentId: departmentId,
                    companyId   : companyId
                })
                utils.showDefaultMessage(storeFn.dispatch, 'save_success')
            })
            .catch((error) => {
                console.log('Save position error', error);
                utils.showDefaultMessage(storeFn.dispatch, 'save_error')
            })
        },

        async [ACTION_SAVE_USER_COMPANY_INFO]<T extends StoreFn>(storeFn: T, company: ICompany){
            return sendQuery({
                type      : requestTypes.post,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'saveUserCompany',
                data      : company
            })
            .then(() => {
                storeFn.commit(SET_COMPANY, company)
                utils.showDefaultMessage(storeFn.dispatch, 'save_success')
            })
            .catch(() => {
                utils.showDefaultMessage(storeFn.dispatch, 'save_error')
            })
        },

        async [ACTION_GET_USER_COMPANY]<T extends StoreFn>(storeFn: T){
            return sendQuery({
                type      : requestTypes.get,
                moduleName: 'api',
                section   : STORE_MODULE_NAME,
                operation : 'getUserCompany',
                data      : {}
            })
            .then((res: AxiosResponse) => {
                if(res.data && res.data.company){
                    console.info('GetUserCompany:', res.data.company);
                    storeFn.commit(SET_COMPANY, res.data.company)
                    storeFn.commit(SET_LOADED, true)
                } else if(storeFn.getters['auth/IS_AUTHENTICATED']) {
                    if(res.data.error){
                        Promise.reject(res.data.message)
                        utils.showDefaultMessage(storeFn.dispatch, 'save_error', res.data.message)
                    }
                }
            })
            .catch((error) => {
                console.log('error', error)
            })
        },

    },

    getters: {
        [GET_USER_COMPANY]: (state: ICompanyState) => {
            return state.company ?? null
        },
        [GET_IS_LOADED]: (state: ICompanyState) => {
            return state.isLoaded
        },
    },

    mutations: {
        [SET_COMPANY](state: ICompanyState, company: ICompany){
            if(typeof company.departments === 'undefined') company = companyDummy
            state.company = company
        },
        [ADD_DEPARTMENT](state: ICompanyState, newDepartment: IDepartment){
            state.company.departments.push(newDepartment)
        },
        [ADD_POSITION](state: ICompanyState, newPosition: IPosition){
            state.company.positions.push(newPosition)
        },
        [ADD_EMPLOYEE](state: ICompanyState, newEmployee: IEmp){
            state.company.employees.push(newEmployee)
        },
        [UPDATE_EMPLOYEE](state: ICompanyState, employee: IEmp){
            const i: number = state.company.employees.findIndex((emp) => {
                return emp.id === employee.id
            })
            state.company.employees.splice(i, 1, employee)
        },
        [SET_LOADED](state: ICompanyState, status: boolean){
            state.isLoaded = status
        },
        // [SET_COMPANY_FIELD](state: ICompanyState, {field, value}: {
        //     field: keyof ICompany,
        //     value: ValueOf<ICompany>
        // }){
        //     state.company[field] = value
        // }
    }
}