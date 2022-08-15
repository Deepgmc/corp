import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/store'

import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
    },


    {
        path: '/employee',
        name: 'employee',
        component: () => import(/* webpackChunkName: "employee" */ '../views/EmployeeView.vue'),
    },
        {
            path: '/employee/add-employee',
            name: 'addEmployee',
            component: () => import(/* webpackChunkName: "add-employee" */ '../views/AddEmployeeView.vue'),
        },
        {
            path: '/employee/departments',
            name: 'departments',
            component: () => import(/* webpackChunkName: "departments" */ '../views/DepartmentsView.vue'),
        },


    {
        path: '/bills',
        name: 'bills',
        component: () => import(/* webpackChunkName: "bills" */ '../views/BillsView.vue')
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: () => import(/* webpackChunkName: "transactions" */ '../views/TransactionsView.vue')
    },
    {
        path: '/my-company',
        name: 'myCompany',
        component: () => import(/* webpackChunkName: "myCompany" */ '../views/MyCompanyView.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/AuthView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters['auth/IS_AUTHENTICATED']) {
        next('/login')
    } else {
        next()
    }
})

export default router
