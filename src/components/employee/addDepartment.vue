<template>
    <div class="card mt-2">
        <div class="card-header">
            Новый департамент
        </div>
        <div class="card-body">
            <form @submit.prevent="onDeptSave">

                <label for="deptName" class="form-label card-text">Название</label>
                <input
                    @input           ="setDeptName"
                    v-model          ="localDeptName"
                    type             ="text"
                    :class           ="['form-control', {'is-invalid': errorsList.includes('localDeptName')}]"
                    id               ="deptName"
                    aria-describedby ="deptNameHelp"
                >
                <div id="deptNameHelp" class="form-text">
                    Длина названия {{minDeptNameLength}}-{{maxDeptNameLength}} символов
                </div>

                <button type="submit" class="btn btn-primary">Сохранить</button>

            </form>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

export default {

    name: 'addDept',

    data() {
        return {
            localDeptName    : '',
            maxDeptNameLength: 30,
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

            this.saveNewDepartment({
                deptName : this.localDeptName,
                companyId: this.company.id
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