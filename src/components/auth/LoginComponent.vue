<template>
    <div>
        <hr />
        <div>{{ isRegistering ? 'Register' : 'Login'}} component</div>
        <form @submit.prevent="onLoginSubmit">
        <div>
            <input
                v-model     = "userLogin"
                type        = "text"
                placeholder = "user name"
            />
        </div>
        <div>
            <input
                v-model     = "password"
                type        = "password"
                placeholder = "password"
            />
        </div>
        <div><label>вкл. регистрацию<input type="checkbox" v-model="isRegistering"></label></div>
        <div><button>Войти</button></div>
        <div v-if="isAuthenticated">logined!</div>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'LoginComponent',

    data: () => {
        return {
            userLogin: 'test name',
            password: 'test_password',
            isRegistering: false
        };
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
        })
    },

    methods: {
        onLoginSubmit(){
            this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                userLogin    : this.userLogin,
                password     : this.password
            })
        }
    }
};
</script>
