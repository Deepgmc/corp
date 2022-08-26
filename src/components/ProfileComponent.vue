<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card mt-2">
                <div class="card-header card-header__colors">

                </div>
                <div class="card-body">
                    <form @submit.prevent="saveProfileSettings">
                        <div class="mb-3">
                            <label for="name" class="form-label">ФИО</label>
                            <input
                                @input           ="setLocalName"
                                v-model          ="localName"
                                type             ="text"
                                :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('localName')}]"
                                id               ="name"
                                aria-describedby ="nameHelp"
                                required         ="required"
                            />
                            <div id="nameHelp" class="form-text form-help-text">
                                Длина логина не больше {{maxFioLength}} символов, не должно содержать цифр
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </form>

                    <div class="col offset-11">
                        <button class="btn btn-sm btn-secondary" v-if="isAuthenticated" @click="logout">Выйти</button>
                    </div>
                </div>
            </div>
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
            localName: '',
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
                name: this.localName
            }

            this.saveProfileInfo({
                newUser : newUser
            })
        },

        ...mapActions('auth', {
            saveProfileInfo: 'ACTION_SAVE_PROFILE_INFO'
        }),

        setLocalName ($event) {//при изменении триггерим vuelidate
            this.v.localName.$touch()
        },

        logout() {
            this.$auth.logout.call(this)
        },
    },

    mounted(){
        if(!this.user) this.localName = ''
        else this.localName = this.user.name
    },

    validations () {
        return {
            localName: {
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