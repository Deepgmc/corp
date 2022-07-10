import $api from '../../utils/api.js'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
    GET_USER_COMPANY,
    SET_COMPANY
} from '../../utils/STORE_C'

const STORE_MODULE_NAME = 'company'

export default {

    namespaced: true,

    state() {
        return {
            /** компания вошедшего юзера
                все остальные сущности - сотрудники, счета и т.п. относятся к этой компании, являются её подсущностями
            */
            company: null
        }
    },

    actions: {
        async [ACTION_SAVE_USER_COMPANY_INFO]({state, commit, dispatch, getters}, companyData){
            $api.sendQuery({
                type: 'POST',
                moduleName: 'api',
                section: STORE_MODULE_NAME,
                operation: 'saveUserCompany',
                data: companyData
            })
            .then((res) => {
                console.log('res', res);
            })
            .catch((error) => {
                console.log('error', error);
            })
        },
    },

    gettters: {
        [GET_USER_COMPANY]  : (state) => state.company ?? null,
    },

    mutations: {
        [SET_COMPANY](state, company){
            state.company = company
        },
    }
}