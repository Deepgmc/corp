<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            {{mainCaption}}
        </div>
        <div class="card-body">
            <form @submit.prevent="saveEmployeeSubmit">

                <div class="row card__subcaption_border">
                    <div class="col-md-12">
                        <h6>Общие данные</h6>
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <label for="employeeName" class="form-label">ФИО</label>
                        <input
                            @input           ="setEmployeeNameField"
                            v-model          ="employeeName"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeName')}]"
                            id               ="employeeName"
                            aria-describedby ="employeeNameHelp"
                        >
                        <div id="employeeNameHelp" class="form-text form-help-text">
                            Длина {{minEmployeeNameLength}}-{{maxEmployeeNameLength}} символов, без цифр
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="employeeBirthday" class="form-label">Дата рождения</label>
                        <input
                            @change          ="setBirthdayField"
                            v-model          ="employeeBirthday"
                            type             ="date"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeBirthday')}]"
                            id               ="employeeBirthday"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="employeeAddress" class="form-label">Адрес проживания</label>
                        <input
                            @input           ="setEmployeeAddressField"
                            v-model          ="employeeAddress"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeAddress')}]"
                            id               ="employeeAddress"
                        >
                    </div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6">
                        <label for="employeePhone" class="form-label">Телефон</label>
                        <input
                            @input           ="setEmployeePhoneField"
                            v-model          ="employeePhone"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeePhone')}]"
                            id               ="employeePhone"
                            v-mask="'+7(###) ###-##-##'"
                            placeholder="+7(000) 000-00-00"
                        >
                    </div>
                    <div class="col-md-6">
                        <label for="employeeEmail" class="form-label">Почта</label>
                        <input
                            @input           ="setEmployeeEmailField"
                            v-model          ="employeeEmail"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeEmail')}]"
                            id               ="employeeEmail"
                            placeholder      = "email@email.ru"
                        >
                    </div>
                </div>

                <!--###########################-->
                <div class="row mt-4 card__subcaption_border">
                    <div class="col-md-12">
                        <h6>Внутренние данные компании</h6>
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
                        <label for="selectedPosition" class="form-label">Штатная должность</label>
                        <select
                            id="selectedPosition"
                            v-model ="selectedPosition"
                            @change ="setPositionField"
                            :class  ="['form-control form-control-sm', {'is-invalid': errorsList.includes('selectedPosition')}]"
                        >
                            <option disabled value="">выберите должность</option>
                            <option
                                v-for ="position in positionsToChoose"
                                :key  ="position.id"
                                :value="position.id"
                            >
                                {{position.name}}
                            </option>
                        </select>
                    </div>
                </div>

                <div class="row mt-2">
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
                    <div class="col-md-6">
                        <label for="employeeSalary" class="form-label">Заработная плата (до НДФЛ)</label>
                        <input
                            id="employeeSalary"
                            v-model ="employeeSalary"
                            @change ="setEmployeeSalaryField"
                            :class  ="['form-control form-control-sm', {'is-invalid': errorsList.includes('employeeSalary')}]"
                            type="number"
                            aria-describedby ="employeeSalaryHelp"
                        >
                        <div id="employeeSalaryHelp" class="form-text form-help-text">
                            Без учёта налогов, целое число
                        </div>
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
                        <span v-if="this.isModal" type="button" class="btn btn-secondary" style="margin-left:10px;" data-bs-dismiss="modal">Закрыть</span>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, helpers } from '@vuelidate/validators'
import { onlyWords, number, ONLY_LETTERS, NUMBER, MAX_LENGTH, MIN_LENGTH, REQUIRED, EMAIL } from '../../utils/customValidations'
import { mapState, mapActions } from 'vuex'

import utils from '@/utils/utilFunctions'


export default {

    name: 'AddEmployee',

    data(){
        return {
            mainCaption: 'Приём нового сотрудника',

            selectedDepartment: 1,
            selectedPosition  : '',
            employeeName      : 'test name',
            employeeBirthday  : '1988-01-15',
            hireDate          : '2022-08-17',
            employeeAddress   : 'Moskovsky str 19, 2a',
            employeePhone     : '+7(543) 543-53-45',
            employeeEmail     : 'email@email.ru',
            employeeSalary    : 50000,
            passportSerial    : '4009-567890',
            passportPlace     : 'test passport place, moscow',
            innNumber         : 123456789012,
            snilsNumber       : '111-111-111-11',
            empRecordNumber   : '1234567',

            /** validations */
            maxEmployeeNameLength   : 50,
            minEmployeeNameLength   : 8,
            maxEmployeeAddressLength: 200,
            minEmployeeAddressLength: 8,

            minHireDateLength     : 12,   //TODO формат даты уточнить
            employeeBirthdayLength: 12,   //TODO формат даты уточнить

            passportSerialLength  : 11,
            passportPlaceMaxLength: 255,
            innNumberLength       : 12,
            snilsNumberLength     : 14,
            empRecordNumberLength : 7,
            empPhoneLength        : 12,
        }
    },

    watch: {
        loadingEmployeeId(){
            /*
                приобновлении входящего индекса (при редактировании) -
                применим редактируемого сотрудника
            */
            if(this.loadingEmployeeId){
                this.mainCaption = 'Редактирование данных сотрудника'
                const thisEmployee = this.company.employees.find(emp => emp.id === this.loadingEmployeeId)

                this.selectedDepartment = thisEmployee.departmentId
                this.selectedPosition   = thisEmployee.positionId
                this.employeeName       = thisEmployee.fio

                this.employeeBirthday   = this.formatDateToInput(new Date(thisEmployee.employeeBirthday * 1000))
                this.hireDate           = this.formatDateToInput(new Date(thisEmployee.hireDate * 1000))

                this.employeeAddress    = thisEmployee.employeeAddress
                this.employeePhone      = thisEmployee.employeePhone
                this.employeeEmail      = thisEmployee.employeeEmail
                this.employeeSalary     = thisEmployee.employeeSalary
                this.passportSerial     = thisEmployee.passportSerial
                this.passportPlace      = thisEmployee.passportPlace
                this.innNumber          = thisEmployee.innNumber
                this.snilsNumber        = thisEmployee.snilsNumber
                this.empRecordNumber    = thisEmployee.empRecordNumber
            }
        }
    },

    fieldNames: [
        'selectedDepartment',
        'selectedPosition',
        'employeeName',
        'hireDate',
        'employeeBirthday',
        'employeeAddress',
        'employeePhone',
        'employeeEmail',
        'employeeSalary',
        'passportSerial',
        'passportPlace',
        'innNumber',
        'snilsNumber',
        'empRecordNumber',
    ],

    props: {
        loadingEmployeeId: {
            type    : Number,
            required: false,
            default : null
        },
        isModal: {
            type    : Boolean,
            required: false,
            default : false
        }
    },

    computed: {
        errorsList(){
            return this.v.$errors.map((error) => error.$property)
        },

        ...mapState('company', {
            company: state => state.company
        }),
        positionsToChoose(){
            return this.company.positions.filter(position => position.departmentId === this.selectedDepartment)
        }
    },

    methods: {
        ...mapActions('company', {
            saveEmployee: 'ACTION_SAVE_NEW_EMPLOYEE'
        }),

        setEmployeeNameField (/*$event*/) {this.v.employeeName.$touch()},
        setDepartmentField (/*$event*/) {this.v.employeeName.$touch()},
        setPositionField (/*$event*/) {this.v.employeeName.$touch()},
        setHireDateField (/*$event*/) {this.v.hireDate.$touch()},
        setBirthdayField (/*$event*/) {this.v.employeeBirthday.$touch()},
        setEmployeeAddressField (/*$event*/) {this.v.employeeAddress.$touch()},
        setEmployeePhoneField (/*$event*/) {this.v.employeePhone.$touch()},
        setEmployeeEmailField (/*$event*/) {this.v.employeeEmail.$touch()},
        setEmployeeSalaryField (/*$event*/) {this.v.employeeSalary.$touch()},
        setPassportSerialField (/*$event*/) {this.v.passportSerial.$touch()},
        setPassportPlaceField (/*$event*/) {this.v.passportPlace.$touch()},
        setInnNumberField (/*$event*/) {this.v.innNumber.$touch()},
        setSnilsNumberField (/*$event*/) {this.v.snilsNumber.$touch()},
        setEmpRecordNumberField (/*$event*/) {this.v.empRecordNumber.$touch()},

        async saveEmployeeSubmit(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid addEmployee validation!', this.v.$errors)
                return
            }
            if(!this.company.id){
                console.error('add employee error')
                return
            }

            this.saveEmployee({
                    isRedacting: !!this.loadingEmployeeId,
                    employee: {
                        id              : this.loadingEmployeeId,
                        fio             : this.employeeName,
                        departmentId    : this.selectedDepartment,
                        positionId      : this.selectedPosition,
                        hireDate        : Math.floor(new Date(this.hireDate) / 1000),
                        employeeBirthday: Math.floor(new Date(this.employeeBirthday) / 1000),
                        employeeAddress : this.employeeAddress,
                        employeePhone   : this.employeePhone,
                        employeeEmail   : this.employeeEmail,
                        employeeSalary  : this.employeeSalary,
                        passportSerial  : this.passportSerial,
                        passportPlace   : this.passportPlace,
                        innNumber       : this.innNumber,
                        snilsNumber     : this.snilsNumber,
                        empRecordNumber : this.empRecordNumber,
                        companyId       : this.company.id
                    },
                })
                .then(() => {
                    /**после сабмита - обнуляем форму */
                        this.$options.fieldNames.forEach(field => {
                            this[field] = ''
                        })
                        this.v.$reset()
                    })
        }
    },

    validations () {
        const nFn = helpers.withMessage(NUMBER, number)
        const requiredFn = helpers.withMessage(REQUIRED, required)
        const emailFn = helpers.withMessage(EMAIL, email)
        return {
            employeeName: {
                required : requiredFn,
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minEmployeeNameLength}`, minLength(this.minEmployeeNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxEmployeeNameLength}`, maxLength(this.maxEmployeeNameLength)),
                onlyWords: helpers.withMessage(ONLY_LETTERS, onlyWords),
            },
            employeeAddress: {
                required : requiredFn,
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minEmployeeAddressLength}`, minLength(this.minEmployeeAddressLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxEmployeeAddressLength}`, maxLength(this.maxEmployeeAddressLength)),
            },
            selectedDepartment: {
                required: requiredFn,
                number  : nFn
            },
            selectedPosition: {
                required: requiredFn,
                number  : nFn
            },
            hireDate: {
                required: requiredFn,
            },
            employeeBirthday: {
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
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.innNumberLength}`, minLength(this.innNumberLength)),
            },
            snilsNumber: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.snilsNumberLength}`, maxLength(this.snilsNumberLength)),
            },
            empRecordNumber: {
                required : requiredFn,
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.empRecordNumberLength}`, maxLength(this.empRecordNumberLength)),
            },
            employeeSalary: {
                required : requiredFn,
                number   : nFn
            },
            employeePhone: {
                required : requiredFn,
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.empPhoneLength}`, minLength(this.empPhoneLength)),
            },
            employeeEmail: {
                required: requiredFn,
                email   : emailFn
            },
        }
    },

    inject: ['formatDateToInput'],

    setup () {
        return {
            v: useVuelidate()
        }
    },
}
</script>