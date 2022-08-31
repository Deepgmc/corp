import { ICompany, IUser } from './StoreTypes'

export enum requestTypes {get = 'get', post = 'post'}
import { AxiosResponse } from 'axios'

export interface IAxiosQuery {
    type      : requestTypes,
    moduleName: string,
    section   : string,
    operation : string,
    data      : any
}

export type TError = string

// export interface IResponseDataFormat {
//     authData: {
//         user: IUser,
//     },
//     error: TError,
//     message: {
//         message: string,
//         insertId: number
//     },
//     foundUser: string,
//     company: ICompany
// }
// export interface IResponseFormat {
//     value: void,
//     data: IResponseDataFormat
// }

// export interface IAxiosResponse {
//     res: void | Promise<AxiosResponse>
// }



export interface ISuccess {
    message: string,
    error?: object
}

export interface ISorting {
    field    : string,
    type     : string,
    direction: number
}