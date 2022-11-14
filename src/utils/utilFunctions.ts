import {
    ACTION_SHOW_NOTIFICATION,
} from './STORE_C'

import { Dispatch } from 'vuex'

import {
    SAVE_SUCCESS,
    SAVE_ERROR,
    ALREADY_LOGINED,
    REGISTER_ERROR
} from './MESSAGES'

import { ISorting } from '@/types/globalTypes'
import { IDepartment, IEmp } from '@/types/StoreTypes'

function showDefaultMessage(dispatcher: Dispatch, type: string, message = ''){
    if(!message){
        switch(type){
            case 'save_success': message   = SAVE_SUCCESS; break;
            case 'save_error': message     = SAVE_ERROR; break;
            case 'login_error': message    = ALREADY_LOGINED; break;
            case 'register_error': message = REGISTER_ERROR; break;
        }
    }
    type = type.split('_')[1]
    dispatcher(ACTION_SHOW_NOTIFICATION, {type: type, message: message }, { root: true } )
}

function sortList({sorting}: {sorting: ISorting}){
    const resSorting = {
        field    : sorting.field,
        type     : sorting.type,
        direction: sorting.direction
    }
    return resSorting
}

function timestampToNumbers(timestamp: number, locale: string) {
    const formatter = new Intl.DateTimeFormat(locale ?? 'ru')
    return formatter.format(timestamp * 1000)
}

function getDepartmentSize(employees: Array<IEmp>, departmentId: number) {
    return employees.filter(emp => emp.departmentId === departmentId).length
}
function getDepartmentById(departments: Array<IDepartment>, departmentId: number): IDepartment | null{
    const department = departments.find(dep => dep.id === departmentId)
    if(!department) return null
    else return department
}



export default {
    showDefaultMessage,
    sortList,
    timestampToNumbers,
    getDepartmentSize,
    getDepartmentById
}