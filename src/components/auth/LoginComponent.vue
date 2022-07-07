<template>
    <div>
        <form @submit.prevent="onLoginSubmit">

            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="isRegistering" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    зарегистрироваться
                </label>
            </div>

            <hr />

            <div>{{ isRegistering ? 'Регистрация' : 'Авторизация'}}</div>

            <div>
                <input
                    v-model     = "login"
                    type        = "text"
                    placeholder = "user name"
                    class       = "form-control"
                />
            </div>
            <div>
                <input
                    v-model     = "password"
                    type        = "password"
                    placeholder = "password"
                    class       = "form-control"
                />
            </div>

            <div>
                <button class="btn btn-success">
                    {{ isRegistering ? 'Зарегистрироваться' : 'Войти' }}
                </button>
            </div>

            <div v-if="isAuthenticated" class="alert alert-warning mt-2">Вы уже авторизованы в системе</div>

            <div v-if="loginErorr !== null">
                <p>{{ loginErorr.message }}</p>
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
        }),
        loginErorr () {
            const error = this.$store.getters['auth/GET_LOGIN_ERROR']
            return error
        }
    },

    methods: {
        onLoginSubmit(){
            this.$auth.login.call(this)
        },
    }
};
</script>
