import {
    ACTION_SHOW_NOTIFICATION,
    ACTION_SAVE_USER_COMPANY_INFO
} from '../utils/STORE_C.js'
import { notify } from '@kyvg/vue3-notification'

export default {

    [ACTION_SHOW_NOTIFICATION]({state, commit}, {type, message}) {
        let title = ''
        switch(type){
            case 'error'        : title = 'Внимание!'; break
            case 'success'      : title = ''; break
            case 'info'         : title = 'Информация!'; break
            default             : title = 'Информация!'; break
        }
        notify({
            title   : title,
            text    : message,
            max     : 1,
            type    : type
        })
    },


}