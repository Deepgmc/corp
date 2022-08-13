<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            Новый сотрудник
        </div>
        <div class="card-body">
            <form @submit.prevent="saveEmployeeSubmit">

                <div class="row mt-4 card__subcaption_border">
                    <div class="col-md-12">
                        <h6>Общие данные</h6>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="employeeName" class="form-label">ФИО</label>
                        <div id="employeeNameHelp" class="form-text form-help-text">
                            Длина {{minEmployeeNameLength}}-{{maxEmployeeNameLength}} символов, без цифр
                        </div>
                        <input
                            @input           ="setEmployeeNameField"
                            v-model          ="employeeName"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeName')}]"
                            id               ="employeeName"
                            aria-describedby ="employeeNameHelp"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <label for="selectedDepartment" class="form-label">Департамент</label>
                        <select
                            id="selectedDepartment"
                            v-model ="selectedDepartment"
                            @change ="setDepartmentField"
                            :class  ="['form-control form-control-sm', {'is-invalid': errorsList.includes('selectedDepartment')}]"
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
                    <div class="col-md-6">
                        <label for="hireDate" class="form-label">Дата трудоустройтсва</label>
                        <input
                            id="hireDate"
                            class="form-control  form-control-sm"
                            type="date"
                        >
                    </div>
                </div>

                <!--###########################-->
                <div class="row mt-4 card__subcaption_border">
                    <div class="col-md-12">
                        <h6>Паспортные данные</h6>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <label for="passportSerial" class="form-label">Серия</label>
                        <input
                            id="passportSerial"
                            type="text"
                            class="form-control form-control-sm"
                        >
                    </div>

                    <div class="col-md-6">
                        <label for="passportNumber" class="form-label">Номер</label>
                        <input
                            id="passportNumber"
                            type="text"
                            class="form-control form-control-sm"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="passportPlace" class="form-label">Кем выдан</label>
                        <input
                            id="passportPlace"
                            type="text"
                            class="form-control form-control-sm"
                        >
                    </div>
                </div>

                <!--###########################-->
                <div class="row mt-4 card__subcaption_border">
                    <div class="col-md-12">
                        <h6>Налоговые и страховые данные</h6>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <label for="innNumber" class="form-label">ИНН</label>
                        <input
                            id="innNumber"
                            type="text"
                            class="form-control form-control-sm"
                        >
                    </div>

                    <div class="col-md-6">
                        <label for="snilsNumber" class="form-label">Номер страхового свидетельства</label>
                        <input
                            id="snilsNumber"
                            type="text"
                            class="form-control form-control-sm"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="empRecordNumber" class="form-label">Номер трудовой книжки</label>
                        <input
                            id="empRecordNumber"
                            type="text"
                            class="form-control form-control-sm"
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
import { onlyWords, number, ONLY_LETTERS, NUMBER, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

import utils from '@/utils/utilFunctions'

export default {

    name: 'AddEmployee',

    data(){
        return {
            selectedDepartment   : '',
            employeeName    : '',
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
            this.v.employeeName.$touch()
        },
        setDepartmentField ($event) {
            this.v.employeeName.$touch()
        },

        async saveEmployeeSubmit(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid addEmployee validation!', this.v.$errors)
                return
            }
            if(!this.company.id){
                utils.showDefaultMessage(dispatch, 'save_error')
                return
            }

            this.saveUserCompanyInfo({
                    employee: {
                        fio: this.employeeName
                    },
                    companyId   : this.company.id,
                    departmentId: this.selectedDepartment
                })
                .then(() => {
                        this.employeeName = ''
                        this.selectedDepartment = ''
                        this.v.$reset()
                    })
        }
    },

    validations () {
        return {
            employeeName: {
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