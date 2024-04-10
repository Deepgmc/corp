<template>
<div class="card mt-2">
    <div class="card-header card-header__colors">
        Настройки компании
    </div>
    <div class="card-body">
        <form @submit.prevent="companyFormSubmit">

            <div class="mb-3">
                <label for="companyName" class="form-label">Название компании</label>
                <input
                    @input           ="setName"
                    v-model          ="localName"
                    type             ="text"
                    :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('localName')}]"
                    id               ="companyName"
                    aria-describedby ="nameHelp"
                />
                <div id="nameHelp" class="form-text">
                    Длина названия не больше 40 символов
                </div>
            </div>

            <div class="mb-3">
                <label for="address" class="form-label">Адрес компании</label>
                <input
                    v-model          = "localAddress"
                    @input           = "setAddress"
                    type             = "text"
                    :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('localAddress')}]"
                    id               = "address"
                    aria-describedby = "addressHelp"
                />
                <div id="addressHelp" class="form-text">
                    Длина адреса не больше 40 символов и не менее 10
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { onlyWords, ONLY_LETTERS, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../utils/customValidations'

import {
    ACTION_SAVE_USER_COMPANY_INFO,
} from '../utils/STORE_C'

export default defineComponent({

    name: 'MyCompanyComponent',

    data() {
        return {
            localName       : '',
            localAddress    : '',
            maxNameLength   : 50,
            minNameLength   : 3,
            minAddressLength: 5,
            maxAddressLength: 100
        }
    },

    computed: {
        errorsList(): Array<any>{
            return this.v.$errors.map((error) => error.$property)
        },

        ...mapState('company', ['company']),
    },

    methods: {

        ...mapActions('company', {
            saveUserCompanyInfo: ACTION_SAVE_USER_COMPANY_INFO
        }),

        setName () {
            this.v.localName.$touch()
        },

        setAddress () {
            this.v.localAddress.$touch()
        },

        async companyFormSubmit(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid user company validation!')
                return
            }

            this.saveUserCompanyInfo({
                name   : this.localName,
                address: this.localAddress
            })
        }

    },

    created(){
        if(!this.$store.state['company'].company){
            /** начальная инициализация пустым значением */
            this.$store.commit('company/SET_COMPANY', {
                name   : '',
                address: ''
            })
        }
    },

    mounted(){
        this.localName = this.company.name
        this.localAddress = this.company.address
    },

    validations () {
        return {
            localName: {
                required : helpers.withMessage(REQUIRED, required),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minNameLength}`, minLength(this.minNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxNameLength}`, maxLength(this.maxNameLength)),
            },
            localAddress: {
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minAddressLength}`, minLength(this.minAddressLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxAddressLength}`, maxLength(this.maxAddressLength)),
            }
        }
    },

    setup () {
        return {
            v: useVuelidate()
        }
    },
});
</script>
