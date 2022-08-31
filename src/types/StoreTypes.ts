export interface RootState {
    notification: object
}

import { Commit, Dispatch, GetterTree } from 'vuex'

export interface StoreFn {
    state   : IAuthState,
    commit  : Commit,
    dispatch: Dispatch,
    getters : GetterTree<IAuthState, any>,
}

export interface ILoginData {
    login   : string,
    password: string
}

export interface IRegisterData extends ILoginData {
    name: string,
}

export interface IUser {
    companyId: number,
    id       : number,
    login    : string,
    name     : string,
    token    : string
}

export interface IAuthState {
    isLoading: boolean,
    user     : IUser | null,
    token    : string | null,
    error    : string | null,
    success  : string | null
}

export interface IEmp {
    companyId       : number,
    create_time     : number,
    departmentId    : number,
    empRecordNumber : number,
    employeeAddress : string,
    employeeBirthday: number,
    employeeEmail   : string,
    employeePhone   : string,
    employeeSalary  : number,
    fio             : string,
    hireDate        : number,
    id              : number,
    innNumber       : string,
    passportPlace   : string,
    passportSerial  : string,
    positionId      : number,
    snilsNumber     : string
}
export interface IEmployee {
    isRedacting: boolean,
    employee   : IEmp
}

export interface IDepartment {
    companyId: number,
    id       : number,
    name     : string
}

export interface IPosition {
    companyId   : number,
    departmentId: number,
    id          : number,
    name        : string
}

export interface ICompany {
    address     : string,
    departments : Array<IDepartment>,
    employees   : Array<IEmp>,
    id          : number | null,
    name        : string
    positions   : Array<IPosition>
}
export type ValueOf<T> = T[keyof T]

export interface ICompanyState {
    isLoaded: boolean,
    company : ICompany
}

