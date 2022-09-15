<template>
    <div class="container">

        <div class="row">
            <div class="col-md-9">
                <img alt="Corp logo" :src="umbrellaLogo">
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="col-md-3">

            </div>
        </div>

        <div class="row border-bottom pt-4 pb-4">
            <div class="col-md-2">
                <login-info></login-info>
            </div>
            <div class="col-md-9">

            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
                <nav-component />
            </div>
            <div class="col-md-10">
                <main>
                    <router-view></router-view>
                </main>
            </div>
        </div>

        <div class="row border-top mt-4">
            <div class="col-md-12">
                <footer>
                    Footer
                </footer>
            </div>
        </div>

        <!-- global notifications plugin -->
        <notifications class="notification" position="top center" width="400" />

    </div>
</template>


<script>
import NavComponent from '@/components/NavComponent.vue'
import LoginInfo from '@/components/LoginInfo.vue'
import { mapGetters, mapActions } from 'vuex'

import {showDefaultMessage, getDepartmentSize} from '@/utils/utilFunctions'

import umbrellaLogo from '@/assets/umbrella-logo.png'

export default {
    name: 'App',

    data(){
        return {
            umbrellaLogo: umbrellaLogo
        }
    },

    components: {NavComponent, LoginInfo},

    created() {
        if(this.isAuthenticated){
            /**
            если пользователь уже имеет токен (авториован)
            то перед запуском приложения надо проверить актуальность этого токена
            и если не актуален - обнулить его
            */
            this.checkUserAuthorisation()
        }
    },

    mounted(){

        /**
            подгружаем общие на всё приложение данные:
            - самого пользователя
            - его компанию
            - списки сотрудников и счетов?
        */
        //TODO надо ли подгружать тут списки или только суммы по спискам?
        /** данные юзера */
        if(this.isAuthenticated){
            this.$auth.getUser.call(this)
        }
        /** данные по компании юзера */
        this.$store.dispatch('company/ACTION_GET_USER_COMPANY', {})
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
            token          : 'auth/GET_TOKEN',
            user           : 'auth/GET_USER'
        })
    },

    methods: {
        ...mapActions('auth', {
            checkUserAuthorisation: 'ACTION_CHECK_USER_AUTH'
        }),
    },

    provide: {
        /**
            различные мелкие утилитарные функции глобального назначения
        */
        formatDateToInput(date) {
            /** меняет местами год месяц, потому что дефолтный инпут принимает дату не в локализованном формате... */
            const day = ('0' + date.getDate()).slice(-2)
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            return `${date.getFullYear()}-${month}-${day}`
        },

        getDepartmentSize: getDepartmentSize,
        showDefaultMessage: showDefaultMessage
    },
}
</script>


<style lang="scss">
.notification{
    margin: 20px 0 0 0;
}
</style>