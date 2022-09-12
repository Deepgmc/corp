
export enum requestTypes {get = 'get', post = 'post'}

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
    direction: number
}

export interface IDepartmentsSummary {
    department: string,
    empNumber : number
}