import {
    ACTION_SHOW_NOTIFICATION,
} from './STORE_C'

import {
    SAVE_SUCCESS,
    SAVE_ERROR,
    ALREADY_LOGINED,
    REGISTER_ERROR
} from './MESSAGES'

function showDefaultMessage(dispatcher, type, message = null){
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

function sortList({name, sorting}){
    this.sorting = {
        field    : name,
        type     : sorting.type,
        direction: sorting.direction
    }
    sorting.direction = sorting.direction * -1
}



export default {
    showDefaultMessage,
    sortList
}