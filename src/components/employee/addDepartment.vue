<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            Новый отдел
        </div>
        <div class="card-body">
            <form @submit.prevent="onDeptSave">

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="deptName" class="form-label card-text">Название</label>
                        <div id="deptNameHelp" class="form-text form-help-text">
                            Длина названия {{minDeptNameLength}}-{{maxDeptNameLength}} символов
                        </div>
                        <input
                            @input           ="setDeptName"
                            v-model          ="localDeptName"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('localDeptName')}]"
                            id               ="deptName"
                            aria-describedby ="deptNameHelp"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <button type="submit" class="btn btn-primary">Сохранить</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

import utils from '@/utils/utilFunctions'

export default {

    name: 'addDept',

    data() {
        return {
            localDeptName    : '',
            maxDeptNameLength: 50,
            minDeptNameLength: 3
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
            saveNewDepartment: 'ACTION_SAVE_NEW_DEPARTMENT'
        }),

        setDeptName ($event) {
            this.v.localDeptName.$touch()
        },

        async onDeptSave(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid department form validation!')
                return
            }

            if(!this.company.id){
                utils.showDefaultMessage(dispatch, 'save_error')
                return
            }

            this.saveNewDepartment({
                    deptName : this.localDeptName,
                    companyId: this.company.id
                })
                .then(() => {
                    this.localDeptName = ''
                    this.v.$reset()
                })
        }
    },

    validations () {
        return {
            localDeptName: {
                required : helpers.withMessage(REQUIRED, required),
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minDeptNameLength}`, minLength(this.minDeptNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxDeptNameLength}`, maxLength(this.maxDeptNameLength)),
            },
        }
    },

    setup () {
        return {
            v: useVuelidate()
        }
    },
}
</script>