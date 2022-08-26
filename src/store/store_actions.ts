import {
    ACTION_SHOW_NOTIFICATION
} from '@/utils/STORE_C'

import { notify } from '@kyvg/vue3-notification'

interface IMsg {
    type   : string,
    message: string
}

export default {
    [ACTION_SHOW_NOTIFICATION]<T extends object, D extends IMsg>(storeFn: T, data: D): void {
        let title = ''
        switch(data.type){
            case 'error'  : title = 'Внимание!'; break
            case 'success': title = ''; break
            case 'info'   : title = 'Информация!'; break
            default       : title = 'Информация!'; break
        }
        notify({
            title: title,
            text : data.message,
            type : data.type
        })
    },
}