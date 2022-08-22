<template>
    <list-card
        :items="localEmployees"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="fio"
    >
        <template #listTableCaption>
            <tr>
                <th v-for="column in columns" :key="column.name" class="text-left">{{column.caption}}</th>
            </tr>
        </template>
        <template #listBody="slotParams">
            <tr>
                <td v-for="column in columns" :key="column.name">
                    <template v-if="column.action">
                        <span v-html="column.action(slotParams)"></span>
                    </template>
                    <template v-else>
                        <span v-html="slotParams.item[column.name]"></span>
                    </template>
                </td>
            </tr>
        </template>
    </list-card>
</template>

<script>
import ListCard from '@/components/common/ListCard.vue'
import { mapState } from 'vuex'

export default {

    name: 'EmployeeList',

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Наши сотрудники',
            columns      : [
                {
                    name   : 'fio',
                    caption: 'ФИО',
                    action : null,
                },
                {
                    name   : 'departmentPositionName',
                    caption: 'Отдел/должность',
                    action : (slotParams) => {
                        return `<div>${slotParams.item.departmentName}</div><div>${slotParams.item.positionName}</div>`
                    },
                },
                {
                    name   : 'employeeContacts',
                    caption: 'Контакты',
                    action : (slotParams) => {
                        return `<div>${slotParams.item.employeePhone}</div><div>${slotParams.item.employeeEmail}</div>`
                    },
                },
                {
                    name   : 'employeeSalary',
                    caption: 'Месячная оплата',
                    action : null
                },
                {
                    name   : 'hireDate',
                    caption: 'Начало работы',
                    action : (slotParams) => {
                        return this.timestampToNumbers(slotParams.item.hireDate)
                    },
                },
            ]
        }
    },

    computed: {

        ...mapState('company', {
            company: state => state.company
        }),

        localEmployees() {
            if(!this.company.employees) return []
            return [...this.company.employees].map(emp => {
                /**
                    нужно из company.departments выцепить имя департамента по id
                    и вставить в список employees
                */
                return {
                    ...emp,
                    departmentName: [...this.company.departments].find((department) => {
                        return department.id === emp.departmentId
                    }).name,
                    positionName: [...this.company.positions].find((position) => {
                        return position.id === emp.positionId
                    }).name,
                }
            })
        }
    },

    mounted(){
        /**
        companyId: 1
        create_time: 1660332784
        departmentId: 4
        departmentName: "Weather monitoring"
        empRecordNumber: null
        employeeAddress: null
        employeeBirthday: null
        employeeEmail: null
        employeePhone: null
        fio: "Davee Jones"
        hireDate: null
        id: 1
        innNumber: null
        passportPlace: null
        passportSerial: null
        snilsNumber: null
        */
    },

    inject: ['timestampToNumbers'],

    components: {ListCard}
}
</script>