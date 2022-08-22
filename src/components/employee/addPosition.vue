<template>
    <div class="card mt-2">
        <div class="card-header card-header__colors">
            Добавить штатную должность
        </div>
        <div class="card-body">
            <form @submit.prevent="onPositionSave">

                <div class="row mt-2">
                    <div class="col-md-12">
                        <label for="departmentId" class="form-label card-text">В каком отделе</label>

                        <select
                            :class="['form-control form-control-sm', {'is-invalid': errorsList.includes('localDepartmentId')}]"
                            v-model="localDepartmentId"
                        >
                            <option disabled value="">Выберите один из вариантов</option>
                            <option
                                v-for ="department in departments"
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
                        <label for="positionName" class="form-label card-text">Название</label>
                        <div id="positionNameHelp" class="form-text form-help-text">
                            Длина названия {{minPositionNameLength}}-{{maxPositionNameLength}} символов
                        </div>
                        <input
                            @input           ="setPositionName"
                            v-model          ="localPositionName"
                            type             ="text"
                            :class           ="['form-control form-control-sm', {'is-invalid': errorsList.includes('localPositionName')}]"
                            id               ="positionName"
                            aria-describedby ="positionNameHelp"
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



export default {

    name: 'addPosition',

    data() {
        return {
            localPositionName    : '',
            localDepartmentId    : '',
            maxPositionNameLength: 60,
            minPositionNameLength: 3
        }
    },

    computed: {
        errorsList(){
            return this.v.$errors.map((error) => error.$property)
        },

        ...mapState('company', {
            departments: state => state.company.departments,
            companyId  : state => state.company.id,
        }),
    },

    methods: {
        ...mapActions('company', {
            saveNewPosition: 'ACTION_SAVE_NEW_POSITION'
        }),

        setPositionName ($event) {
            this.v.localPositionName.$touch()
        },

        async onPositionSave(){
            const result = await this.v.$validate()
            if(!result){
                console.warn('Invalid position form validation!')
                return
            }

            if(!this.companyId){
                this.showDefaultMessage(dispatch, 'save_error')
                return
            }

            this.saveNewPosition({
                    positionName: this.localPositionName,
                    departmentId: this.localDepartmentId,
                    companyId   : this.companyId
                })
                .then(() => {
                    this.localPositionName = ''
                    this.localDepartmentId = ''
                    this.v.$reset()
                })
        }
    },

    validations () {
        const req = helpers.withMessage(REQUIRED, required)
        return {
            localPositionName: {
                required : req,
                minLength: helpers.withMessage(`${MIN_LENGTH} ${this.minPositionNameLength}`, minLength(this.minPositionNameLength)),
                maxLength: helpers.withMessage(`${MAX_LENGTH} ${this.maxPositionNameLength}`, maxLength(this.maxPositionNameLength)),
            },
            localDepartmentId: {
                required : req,
            },
        }
    },

    inject: ['showDefaultMessage'],

    setup () {
        return {
            v: useVuelidate()
        }
    },
}
</script>