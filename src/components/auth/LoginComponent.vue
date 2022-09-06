<template>
    <div>
        <form @submit.prevent="onLoginSubmit">


            <div class="card">
                <div class="card-header">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="isRegistering" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            Регистрация
                        </label>
                    </div>
                </div>
                <div class="card-body">

                    <h5><div>{{ isRegistering ? 'Регистрация' : 'Авторизация'}}</div></h5>
                    <div class="row mb-2">
                        <div class="col-md-12">
                            <input
                                v-model     = "login"
                                type        = "text"
                                placeholder = "логин"
                                class       = "form-control"
                            />
                        </div>
                    </div>

                    <div v-if="isRegistering" class="row mb-2">
                        <div class="col-md-12">
                            <input
                                v-model     = "name"
                                type        = "text"
                                placeholder = "ФИО"
                                class       = "form-control"
                            />
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-md-12">
                            <input
                                v-model     = "password"
                                type        = "password"
                                placeholder = "пароль"
                                class       = "form-control"
                            />
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-md-12">
                            <button class="btn btn-success">
                                {{ isRegistering ? 'Зарегистрироваться' : 'Войти' }}
                            </button>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div v-if="isAuthenticated" class="alert alert-warning mt-2">Вы уже авторизованы в системе</div>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <div class="col-md-12">
                            <div v-if="loginErorr !== null">
                                <p>{{ loginErorr.message }}</p>
                            </div>
                            <div v-if="loginSuccess !== null">
                                <p>{{ loginSuccess.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'LoginComponent',

    data() {
        return {
            login        : 'Test login',
            name         : 'Тестовое Имя',
            password     : 'test_password',
            isRegistering: false
        };
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'auth/IS_AUTHENTICATED',
            loginErorr     : 'auth/GET_LOGIN_ERROR',
            loginSuccess   : 'auth/GET_LOGIN_SUCCESS'
        }),

        loginErorr () {
            return this.$store.getters['auth/GET_LOGIN_ERROR']
        }
    },

    methods: {
        onLoginSubmit(){
            this.$auth.login.call(this)
        },
    }
};
</script>
