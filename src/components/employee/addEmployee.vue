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
                            v-model ="hireDate"
                            @change ="setHireDateField"
                            :class  ="['form-control form-control-sm', {'is-invalid': errorsList.includes('hireDate')}]"
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
                    <div class="col-md-4">
                        <label for="passportSerial" class="form-label">Серия/номер</label>
                        <input
                            @input           ="setPassportSerialField"
                            v-model          ="passportSerial"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('passportSerial')}]"
                            id               ="passportSerial"
                            aria-describedby ="passportSerialHelp"
                            v-mask="'####-######'"
                            placeholder="0000-000000"
                        >
                    </div>

                    <div class="col-md-8">
                        <label for="passportPlace" class="form-label">Кем выдан</label>
                        <input
                            @input           ="setPassportPlaceField"
                            v-model          ="passportPlace"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('passportPlace')}]"
                            id               ="passportPlace"
                            aria-describedby ="passportPlaceHelp"
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
                    <div class="col-md-4">
                        <label for="innNumber" class="form-label">ИНН</label>
                        <input
                            @input           ="setInnNumberField"
                            v-model          ="innNumber"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('innNumber')}]"
                            id               ="innNumber"
                            aria-describedby ="innNumberHelp"
                            v-mask="'############'"
                            placeholder="000000000000"
                        >
                    </div>

                    <div class="col-md-4">
                        <label for="snilsNumber" class="form-label">Номер страхового свидетельства</label>
                        <input
                            @input           ="setSnilsNumberField"
                            v-model          ="snilsNumber"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('snilsNumber')}]"
                            id               ="snilsNumber"
                            aria-describedby ="snilsNumberHelp"
                            v-mask="'###-###-###-##'"
                            placeholder="000-000-000-00"
                        >
                    </div>
                    <div class="col-md-4">
                        <label for="empRecordNumber" class="form-label">Номер трудовой книжки</label>
                        <input
                            @input           ="setEmpRecordNumberField"
                            v-model          ="empRecordNumber"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('empRecordNumber')}]"
                            id               ="empRecordNumber"
                            aria-describedby ="empRecordNumberHelp"
                            v-mask="'#######'"
                            placeholder="0000000"
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
import { required, minLength, maxLength, alphaNum, helpers } from '@vuelidate/validators'
import { onlyWords, number, ONLY_LETTERS, NUMBER, MAX_LENGTH, MIN_LENGTH, REQUIRED } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

//import {mask} from 'vue-the-mask'

import utils from '@/utils/utilFunctions'


export default {

    name: 'AddEmployee',

    data(){
        return {
            selectedDepartment: 2,
            employeeName      : 'test name',
            hireDate          : '2022-08-17',
            passportSerial    : '4009-567890',
            passportPlace     : 'test passport place, moscow',
            innNumber         : 123456789012,
            snilsNumber       : '111-111-111-11',
            empRecordNumber   : '1234567',

            maxEmployeeNameLength : 50,
            minEmployeeNameLength : 8,

            minHireDateLength : 12,//TODO формат даты уточнить

            passportSerialLength  : 11,
            passportPlaceMaxLength: 255,
            innNumberLength       : 12,
            snilsNumberLength     : 14,
            empRecordNumberLength : 7,

        }


    },

    fieldNames: [
        'selectedDepartment',
        'employeeName',
        'hireDate',
        'passportSerial',
        'passportPlace',
        'innNumber',
        'snilsNumber',
        'empRecordNumber',
    ],

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
            saveEmployee: 'ACTION_SAVE_NEW_EMPLOYEE'
        }),

        touchFields(){

        },

        setEmployeeNameField ($event) {this.v.employeeName.$touch()},
        setDepartmentField ($event) {this.v.employeeName.$touch()},
        setHireDateField ($event) {this.v.hireDate.$touch()},
        setPassportSerialField ($event) {this.v.passportSerial.$touch()},
        setPassportPlaceField ($event) {this.v.passportPlace.$touch()},
        setInnNumberField ($event) {this.v.innNumber.$touch()},
        setSnilsNumberField ($event) {this.v.snilsNumber.$touch()},
        setEmpRecordNumberField ($event) {this.v.empRecordNumber.$touch()},

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

            this.saveEmployee({
                    employee: {
                        fio            : this.employeeName,
                        departmentId   : this.selectedDepartment,
                        hireDate       : Math.floor(new Date(this.hireDate) / 1000),
                        passportSerial : this.passportSerial,
                        passportPlace  : this.passportPlace,
                        innNumber      : this.innNumber,
                        snilsNumber    : this.snilsNumber,
                        empRecordNumber: this.empRecordNumber,
                        companyId      : this.company.id,
                    },
                })
                .then(() => {
                        this.employeeName = ''
                        this.selectedDepartment = ''
                        this.hireDate = ''
                        this.passportSerial = ''
                        this.passportPlace = ''
                        this.innNumber = ''
                        this.snilsNumber = ''
                        this.empRecordNumber = ''
                        this.v.$reset()
                    })
        }
    },

    validations () {
        const nFn = helpers.withMessage(NUMBER, number)
        const requiredFn = helpers.withMessage(REQUIRED, required)
        return {
            employeeName: {
                required : requiredFn,
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minEmployeeNameLength}`, minLength(this.minEmployeeNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxEmployeeNameLength}`, maxLength(this.maxEmployeeNameLength)),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
            },
            selectedDepartment: {
                required: requiredFn,
                number  : nFn
            },
            hireDate: {
                required: requiredFn,
            },
            passportSerial: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.passportSerialLength}`, maxLength(this.passportSerialLength)),
            },
            passportPlace: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.passportPlaceMaxLength}`, maxLength(this.passportPlaceMaxLength)),
            },
            innNumber: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.innNumberLength}`, maxLength(this.innNumberLength)),
                minLength: helpers.withMessage(`${MAX_LENGTH} ${this.innNumberLength}`, minLength(this.innNumberLength)),
            },
            snilsNumber: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.snilsNumberLength}`, maxLength(this.snilsNumberLength)),
            },
            empRecordNumber: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.empRecordNumberLength}`, maxLength(this.empRecordNumberLength)),
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