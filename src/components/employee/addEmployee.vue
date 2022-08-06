<template>
    <div class="card mt-2">
        <div class="card-header">
            Новый сотрудник
        </div>
        <div class="card-body">
            <form @submit.prevent="saveEmployee">

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="employeeName" class="form-label card-text">ФИО</label>
                        <input
                            @input           ="setEmployeeName"
                            v-model          ="localEmployeeName"
                            type             ="text"
                            :class           ="['form-control', {'is-invalid': errorsList.includes('localEmployeeName')}]"
                            id               ="deptName"
                            aria-describedby ="deptNameHelp"
                        >
                        <div id="deptNameHelp" class="form-text">
                            Длина {{minEmployeeNameLength}}-{{maxEmployeeNameLength}} символов, без цифр
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <select class="form-control">
                            <option v-for="department in company.departments" :key="department.id" value="{{department.id}}">{{department.name}}</option>
                        </select>
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
import { onlyWords, ONLY_LETTERS, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

export default {

    name: 'AddEmployee',

    data(){
        return {
            localEmployeeName: '',
            maxEmployeeNameLength: 50,
            minEmployeeNameLength: 8
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
        setEmployeeName ($event) {
            this.v.localEmployeeName.$touch()
        },
    },

    validations () {
        return {
            localEmployeeName: {
                required : helpers.withMessage(REQUIRED, required),
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minEmployeeNameLength}`, minLength(this.minEmployeeNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxEmployeeNameLength}`, maxLength(this.maxEmployeeNameLength)),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
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