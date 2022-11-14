
//тип используемый ListCard для формирования строки данных
export interface IEmpListItem {
    [key:string]   : any, //TODO узнать, как назначить тип из IEmp  //import { IEmp } from './StoreTypes'
    departmentName?: string | undefined,
    positionName  ?: string | undefined
}

type AnyFunction = (...args: any[]) => any

export interface IButtonOptionsType {
    text      : string,
    type      : string,
    icon      : string | null,
    link      : string | null,
    dataTarget: string,
    //action    : AnyFunction | null,
    dataModal : string | null
}

export enum requestTypes {
    get  = 'get',
    post = 'post'
}

export type FnType = (a: number, b: string) => string

export interface IAxiosQuery {
    type      : requestTypes,
    moduleName: string,
    section   : string,
    operation : string,
    data      : any
}

export type TError = string

export interface ISuccess {
    message: string,
    error? : object
}

export interface ISorting {
    field    : string,
    type     : string,
    direction: number,
    base     : boolean
}

export interface IDepartmentsGraphSummary {
    department  : string,
    empNumber   : number,
    departmentId: number
}