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
                    visible: ['all'],
                    name: 'home',
                    parentName: null,
                    icon: true,
                    subnav: [],
                },
                {
                    text: 'Моя компания',
                    link: '/my-company',
                    visible: ['logined'],
                    name: 'company',
                    parentName: null,
                    icon: true,
                    subnav: [],
                },
                {
                    text: 'Сотрудники',
                    link: '/employee',
                    visible: ['all'],
                    name: 'employee',
                    parentName: null,
                    icon: true,
                    subnav: [
                        {
                            text: 'новый сотрудник',
                            link: '/employee/add-employee',
                            visible: ['logined'],
                            name: 'addEmployee',
                            parentName: 'employee',
                            subnav: [],
                        },
                        {
                            text: 'департаменты',
                            link: '/employee/departments',
                            visible: ['all'],
                            name: 'departments',
                            parentName: 'employee',
                            subnav: [],
                        },
                    ],
                },
                {
                    text: 'Финансы',
                    link: '/finnance',
                    visible: ['all'],
                    name: 'finnance',
                    parentName: null,
                    icon: true,
                    subnav: [],
                },
                {
                    text: 'Контрагенты',
                    link: '/contractors',
                    visible: ['all'],
                    name: 'contractors',
                    parentName: null,
                    icon: true,
                    subnav: [],
                },
                {
                    text: 'Вход/регистрация',
                    link: '/login',
                    visible: ['unlogined'],
                    name: 'login',
                    parentName: null,
                    icon: false,
                    subnav: [],
                },
                {
                    text: 'Настройки профиля',
                    link: '/profile',
                    visible: ['logined'],
                    name: 'profile',
                    parentName: null,
                    icon: true,
                    subnav: [],
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
                рекурсивно на подпункты
            */
            const authAllow = ['all', 'logined']
            const unlogined = ['all', 'unlogined']

            if(context.isAuthenticated){
                return filterAccess(context.itemsList, authAllow)
            } else {
                return filterAccess(context.itemsList, unlogined)
            }

            function filterAccess(items, type){
                return items.filter((item) => {
                    const intersection = item.visible.filter(vItem => type.includes(vItem))
                    if(item.subnav.length){
                        item.subnav = filterAccess(item.subnav, type)
                    }
                    return !!intersection.length
                })
            }

        }
    },




}
</script>