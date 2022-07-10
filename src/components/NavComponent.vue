<template>
    <nav>
        <div>
            <list-items :listData="authSortedList"></list-items>
        </div>
    </nav>
</template>


<script>

import ListItems from '@/components/layouts/ListItems.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'NavComponent',
    components: {ListItems},

    data: () => {
        return {
            itemsList: [
                {
                    text: 'Главная',
                    link: '/',
                    visible: 'all',
                    name: 'home'
                },
                {
                    text: 'Моя компания',
                    link: '/my-company',
                    visible: 'all',
                    name: 'myCompany'
                },
                {
                    text: 'Сотрудники',
                    link: '/employee',
                    visible: 'all',
                    name: 'employee'
                },
                {
                    text: 'Счета',
                    link: '/bills',
                    visible: 'all',
                    name: 'bills'
                },
                {
                    text: 'Контрагенты',
                    link: '/transactions',
                    visible: 'all',
                    name: 'transactions'
                },
                {
                    text: 'Вход/регистрация',
                    link: '/login',
                    visible: 'registered',
                    name: 'login'
                },
                {
                    text: 'Настройки профиля',
                    link: '/profile',
                    visible: 'all',
                    name: 'profile'
                }
            ]
        }
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
        }),

        authSortedList: (context) => {
            /**
                в левом меню показаны только те пункты меню, которые соответствуют роли пользователя
                на данный момент роли - только "гость" и "зарегистрированный"
            */
            if(!context.isAuthenticated) return context.itemsList
            return context.itemsList.filter((item) => item.visible !== 'registered')
        }
    },




}
</script>


<style>

</style>