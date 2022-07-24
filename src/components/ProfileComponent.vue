<template>
    <div>
        <form @submit.prevent="saveProfileSettings">
            <div class="mb-3">
                <label for="login" class="form-label">Логин</label>
                <input
                    @input          = "setLocalLogin"
                    v-model          = "localLogin"
                    type             = "text"
                    class            = "form-control"
                    id               = "login"
                    aria-describedby = "loginHelp"
                />
                <div id="loginHelp" class="form-text">
                    Длина ФИО не больше 40 символов, не должно содержать цифр
                </div>
                <div class="mb-3">
                    <p v-for="error of v$.$errors" :key="error.$uid" class="text-danger">
                        {{ error.$message }}
                    </p>
                </div>

                    <button type="submit" class="btn btn-primary">Сохранить</button>

            </div>
        </form>

        <div class="col offset-11">
            <button class="btn btn-secondary" v-if="isAuthenticated" @click="logout">Выйти</button>
        </div>
    </div>
</template>

<script>

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { mapGetters, mapState, mapActions } from 'vuex'
import { onlyWords, ONLY_LETTERS, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../utils/customValidations'

export default {

    name: 'ProfileComponent',

    data() {
        return {
            localLogin: ''
        }
    },

    computed: {
        ...mapGetters({
            token          : 'auth/GET_TOKEN',
            user           : 'auth/GET_USER',
            isAuthenticated: 'auth/IS_AUTHENTICATED',
        }),

        ...mapState('auth', {
            user: state => state.user
        }),
    },

    methods: {

        async saveProfileSettings(){
            const result = await this.v$.$validate()
            if(!result){
                console.warn('Invalid profile fields validation!')
                return
            }

            const newUser = {
                login: this.localLogin
            }

            const settings = {testSetting: 123}

            this.saveProfileInfo({
                newUser: newUser,
                settings: settings
            })
        },

        ...mapActions('auth', {
            saveProfileInfo: 'ACTION_SAVE_PROFILE_INFO'
        }),

        setLocalLogin ($event) {//при изменении триггерим vuelidate
            this.v$.localLogin.$touch()
        },

        logout() {
            this.$auth.logout.call(this)
        },
    },

    mounted(){
        this.localLogin = this.user.login
    },

    validations () {
        return {
            localLogin: {
                required: helpers.withMessage(REQUIRED, required),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
                minLength: helpers.withMessage(`${MIN_LENGTH} 3`, minLength(3)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} 40`, maxLength(40)),
            }
        }
    },

    setup () {
        return { v$: useVuelidate() }
    },
}
</script>