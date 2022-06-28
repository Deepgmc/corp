<template>
    <div>
        <button v-if="isAuthenticated" @click="logout">Выйти</button>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

    name: 'HomeComponent',

    computed: {
        ...mapGetters({
            token          : 'auth/GET_TOKEN',
            user           : 'auth/GET_USER',
            isAuthenticated: 'auth/IS_AUTHENTICATED',
        })
    },

    methods: {
        logout() {
            this.$auth.logout.call(this)
        }
    }
}
</script>