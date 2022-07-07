<template>
    <nav>
        <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li v-for="option in itemsList">
                    <nav-item :text="option.text" :link="option.link"></nav-item>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
import NavItem from '@/components/layouts/NavItem.vue'

export default {
    name: 'NavComponent',
    components: {NavItem},

    data: () => {
        return {
            itemsList: [
                {
                    text: 'Главная',
                    link: '/'
                },
                {
                    text: 'Вход/регистрация',
                    link: '/login'
                },
                {
                    text: 'Настройки профиля',
                    link: '/profile'
                }
            ]
        }
    },




}
</script>


<style>

</style>