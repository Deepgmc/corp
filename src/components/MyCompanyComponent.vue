<template>
    <div class="row">
        <div class="col-12">
            <form @submit.prevent="companyFormSubmit">
                <div class="mb-3">
                    <label for="companyName" class="form-label">Название вашей компании</label>
                    <input
                        @change          = "setName"
                        v-model          = "name"
                        type             = "text"
                        class            = "form-control"
                        id               = "companyName"
                        aria-describedby = "nameHelp"
                    />
                    <div id="nameHelp" class="form-text">
                        Длина названия не больше 40 символов
                    </div>
                    <div v-if="v$.name.$error" class="alert alert-danger">Имя компании задано не верно</div>
                </div>

                <div class="mb-3">
                    <label for="address" class="form-label">Адрес вашей компании</label>
                    <input
                        v-model          = "address"
                        type             = "text"
                        class            = "form-control"
                        id               = "address"
                        aria-describedby = "addressHelp"
                    />
                    <div id="addressHelp" class="form-text">
                        Длина адреса не больше 40 символов, но не менее 10
                    </div>
                    <div v-if="v$.address.$error" class="alert alert-danger">Адрес компании задан не верно</div>
                </div>

                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        </div>
    </div>
</template>

<script>

/* Валидация через vuelidate */
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'MyCompanyComponent',

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),

        name: {
            get() {
                return this.company.name
            },
            set(value) {
                //сэттером пишем в стор - а обратно сюда он уже попадает за счет реактивности
                this.setCompanyField({field: 'name', value})
            }
        },
        address: {
            get() {
                return this.company.address
            },
            set(value) {
                //сэттером пишем в стор - а обратно сюда он уже попадает за счет реактивности
                this.setCompanyField({field: 'address', value})
            }
        },
    },

    methods: {

        ...mapActions('company', {
            saveUserCompanyInfo: 'ACTION_SAVE_USER_COMPANY_INFO'
        }),

        ...mapMutations('company', {
            setCompanyField: 'SET_COMPANY_FIELD'
        }),

        setName ($event) {
            this.v$.name.$touch()
        },

        setAddress ($event) {
            this.v$.address.$touch()
        },

        async companyFormSubmit(){
            const result = await this.v$.$validate()
            if(!result){
                console.warn('Invalid user company validation!')
                return
            }

            this.saveUserCompanyInfo({
                name   : this.name,
                address: this.address
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

    validations () {
        return {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(40),
            },
            address: {
                minLength: minLength(10),
                maxLength: maxLength(40),
            }
        }
    },

    setup () {
        return { v$: useVuelidate() }
    },
};
</script>
