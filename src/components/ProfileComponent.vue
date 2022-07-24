<template>
    <div>
        <form @submit.prevent="saveProfileSettings">
            <div class="mb-3">
                <label for="login" class="form-label">Логин</label>
                <input
                    @input           ="setLocalLogin"
                    v-model          ="localLogin"
                    type             ="text"
                    :class           ="['form-control', {'is-invalid': errorsList.includes('localLogin')}]"
                    id               ="login"
                    aria-describedby ="loginHelp"
                    required         ="required"
                />
                <div id="loginHelp" class="form-text form-help-text">
                    Длина логина не больше {{maxFioLength}} символов, не должно содержать цифр
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>

        <div class="col offset-11">
            <button class="btn btn-sm btn-secondary" v-if="isAuthenticated" @click="logout">Выйти</button>
        </div>
    </div>
</template>

<script>

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { onlyWords, ONLY_LETTERS, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../utils/customValidations'

import { mapGetters, mapState, mapActions } from 'vuex'

export default {

    name: 'ProfileComponent',

    data() {
        return {
            localLogin: '',
            maxFioLength: 40,
            minFioLength: 3
        }
    },

    computed: {

        errorsList(){
            return this.v.$errors.map((error) => error.$property)
        },

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
            const result = await this.v.$validate()

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
            this.v.localLogin.$touch()
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
                required : helpers.withMessage(REQUIRED, required),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minFioLength}`, minLength(this.minFioLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxFioLength}`, maxLength(this.maxFioLength)),
            }
        }
    },

    setup () {
        const v = useVuelidate()
        return {
            v
        }
    },
}
</script>