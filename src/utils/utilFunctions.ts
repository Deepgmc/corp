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

function sortList({name, sorting}: {name: string, sorting: ISorting}){
    const resSorting = {
        field    : name,
        type     : sorting.type,
        direction: sorting.direction
    }
    resSorting.direction = sorting.direction * -1
    return resSorting
}



export default {
    showDefaultMessage,
    sortList
}