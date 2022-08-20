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
                        {{column.action(slotParams)}}
                    </template>
                    <template v-else>
                        {{slotParams.item[column.name]}}
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
                    name   : 'departmentName',
                    caption: 'Отдел',
                    action : null,
                },
                {
                    name   : 'employeeContacts',
                    caption: 'Контакты',
                    action : (slotParams) => {
                        return `${slotParams.item.employeePhone} / ${slotParams.item.employeeEmail}`
                    },
                },
                {
                    name   : 'innNumber',
                    caption: 'ИНН',
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
                    }).name
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