<template>
    <div class="row">
        <div class="col-12">
            <form @submit.prevent="companyFormSubmit">

                <div class="mb-3">
                    <label for="companyName" class="form-label">Название вашей компании</label>
                    <input
                        @input           ="setName"
                        v-model          ="localName"
                        type             ="text"
                        :class           ="['form-control', {'is-invalid': errorsList.includes('localName')}]"
                        id               ="companyName"
                        aria-describedby ="nameHelp"
                    />
                    <div id="nameHelp" class="form-text">
                        Длина названия не больше 40 символов
                    </div>
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Адрес вашей компании</label>
                    <input
                        v-model          = "localAddress"
                        @input           = "setAddress"
                        type             = "text"
                        :class           ="['form-control', {'is-invalid': errorsList.includes('localAddress')}]"
                        id               = "address"
                        aria-describedby = "addressHelp"
                    />
                    <div id="addressHelp" class="form-text">
                        Длина адреса не больше 40 символов, но не менее 10
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        </div>
    </div>
</template>

<script>

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { onlyWords, ONLY_LETTERS, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../utils/customValidations'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
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
        errorsList(){
            return this.v.$errors.map((error) => error.$property)
        },

        ...mapState('company', {
            company: state => state.company
        }),
    },

    methods: {

        ...mapActions('company', {
            saveUserCompanyInfo: 'ACTION_SAVE_USER_COMPANY_INFO'
        }),

        ...mapMutations('company', {
            setCompanyField: 'SET_COMPANY_FIELD'
        }),

        setName ($event) {
            this.v.localName.$touch()
        },

        setAddress ($event) {
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
};
</script>
