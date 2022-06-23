<template>
    <div>
        <hr />
        <div>{{ isRegistering ? 'Register' : 'Login'}} component</div>
        <form @submit.prevent="onLoginSubmit">
        <div>
            <input
                v-model     = "login"
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
        <div v-if="loginErorr !== null">
            <p>{{ loginErorr.text }}</p>
        </div>
        <div v-if="loginSuccess !== null">
            <p>{{ loginSuccess.text }}</p>
        </div>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'LoginComponent',

    data: () => {
        return {
            login        : 'test name',
            password     : 'test_password',
            isRegistering: false
        };
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
            loginErorr     : 'auth/GET_LOGIN_ERROR',
            loginSuccess   : 'auth/GET_LOGIN_SUCCESS',
        })
    },

    methods: {
        onLoginSubmit(){
            this.$store.dispatch(`auth/ACTION_${this.isRegistering ? 'REGISTER' : 'LOGIN'}`, {
                login   : this.login,
                password: this.password
            })
        }
    }
};
</script>
