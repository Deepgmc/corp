<template>
    <div>
        <form @submit.prevent="companyFormSubmit">

            <div class="mb-3">
                <label for="companyName" class="form-label">Название вашей компании</label>
                <input
                    v-model="companyName"
                    @change="setName"
                    type="text"
                    class="form-control"
                    id="companyName"
                    aria-describedby="nameHelp"
                />
                <div id="nameHelp" class="form-text">
                    Длина названия не больше 20 символов
                </div>
                <div v-if="v$.companyName.$error" class="alert alert-danger">Имя компании задано не верно</div>
            </div>

            <div class="mb-3">
                <label for="companyAddress" class="form-label">Адрес вашей компании</label>
                <input
                    v-model="companyAddress"
                    @change="setAddress"
                    type="text"
                    class="form-control"
                    id="companyAddress"
                    aria-describedby="addressHelp"
                />
                <div id="addressHelp" class="form-text">
                    Длина адреса не больше 40 символов, но не менее 10
                </div>
                <div v-if="v$.companyAddress.$error" class="alert alert-danger">Адрес компании задан не верно</div>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>

        </form>
    </div>
</template>

<script>

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapGetters } from 'vuex'

export default {
    name: 'MyCompanyComponent',

    setup () {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            companyName: '',
            companyAddress: ''
        }
    },

    validations () {
        return {
            companyName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
            },
            companyAddress: {
                minLength: minLength(10),
                maxLength: maxLength(40),
            }
        }
    },

    computed: {
        ...mapGetters({
            isAuthenticated: 'company/IS_AUTHENTICATED',
            userInfo       : 'auth/GET_USER',
        })
    },

    methods: {

        setName ($event) {
            this.companyName = $event.target.value.trim()
            this.v$.companyName.$touch()
        },

        setAddress ($event) {
            this.companyAddress = $event.target.value.trim()
            this.v$.companyAddress.$touch()
        },

        async companyFormSubmit(){
            const result = await this.v$.$validate()
            if(!result){
                console.warn('Invalid user company validation!')
                return
            }


            // send form
            this.$store.dispatch(`company/ACTION_SAVE_USER_COMPANY_INFO`, {

            })

        }

    },
};
</script>
