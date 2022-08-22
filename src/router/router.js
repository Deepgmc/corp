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
        path: '/finnance',
        name: 'finnance',
        component: () => import(/* webpackChunkName: "bills" */ '../views/FinnanceView.vue')
    },
    {
        path: '/contractors',
        name: 'contractors',
        component: () => import(/* webpackChunkName: "contractors" */ '../views/ContractorsView.vue')
    },
    {
        path: '/my-company',
        name: 'company',
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
