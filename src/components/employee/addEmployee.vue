<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            Новый сотрудник
        </div>
        <div class="card-body">
            <form @submit.prevent="saveEmployeeSubmit">

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="employeeName" class="form-label">ФИО</label>
                        <div id="employeeNameHelp" class="form-text form-help-text">
                            Длина {{minEmployeeNameLength}}-{{maxEmployeeNameLength}} символов, без цифр
                        </div>
                        <input
                            @input           ="setEmployeeNameField"
                            v-model          ="localEmployeeName"
                            type             ="text"
                            :class           ="['form-control', {'is-invalid': errorsList.includes('localEmployeeName')}]"
                            id               ="employeeName"
                            aria-describedby ="employeeNameHelp"
                        >

                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="selectedDepartment" class="form-label">Департамент</label>
                        <div id="deptSelectHelp" class="form-text form-help-text">
                            Длина {{minEmployeeNameLength}}-{{maxEmployeeNameLength}} символов, без цифр
                        </div>
                        <select
                            id ="selectedDepartment"
                            v-model ="selectedDepartment"
                            @change ="setDepartmentField"
                            :class  ="['form-control', {'is-invalid': errorsList.includes('selectedDepartment')}]"
                            aria-describedby ="deptSelectHelp"
                        >
                            <option disabled value="">выберите отдел</option>
                            <option
                                v-for ="department in company.departments"
                                :key  ="department.id"
                                :value="department.id"
                            >
                                {{department.name}}
                            </option>
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
import { onlyWords, number, ONLY_LETTERS, NUMBER, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

export default {

    name: 'AddEmployee',

    data(){
        return {
            selectedDepartment   : '',
            localEmployeeName    : '',
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
        ...mapActions('company', {
            saveUserCompanyInfo: 'ACTION_SAVE_NEW_EMPLOYEE'
        }),

        setEmployeeNameField ($event) {
            this.v.localEmployeeName.$touch()
        },
        setDepartmentField ($event) {
            this.v.localEmployeeName.$touch()
        },

        async saveEmployeeSubmit(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid addEmployee validation!', this.v.$errors)
                return
            }

            this.saveUserCompanyInfo({
                employee: {
                    fio: this.localEmployeeName
                },
                companyId   : this.company.id,
                departmentId: this.selectedDepartment
            })
        }
    },

    validations () {
        return {
            localEmployeeName: {
                required : helpers.withMessage(REQUIRED, required),
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minEmployeeNameLength}`, minLength(this.minEmployeeNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxEmployeeNameLength}`, maxLength(this.maxEmployeeNameLength)),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
            },
            selectedDepartment: {
                required: helpers.withMessage(REQUIRED, required),
                number  : helpers.withMessage(NUMBER, number)
            }
        }
    },

    setup () {
        return {
            v: useVuelidate()
        }
    },
}
</script>