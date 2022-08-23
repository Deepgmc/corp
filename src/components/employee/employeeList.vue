<template>
    <list-card
        :items="localEmployees"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="fio"
        :sorting="sorting"
    >
        <template #listTableCaption>
            <tr>
                <th v-for="column in columns" :key="column.name" class="text-left">
                    {{column.caption}}
                    <span v-if="column.sorting" @click="localSortList(column)" style="color:green;cursor:pointer;">&#8645;</span>
                </th>
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
import utils from '@/utils/utilFunctions.js'

export default {

    name: 'EmployeeList',

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Наши сотрудники',
            sorting      : {
                field    : 'fio',
                type     : 'string',
                direction: 1
            },
            columns      : [
                {
                    name   : 'fio',
                    caption: 'ФИО',
                    sorting: {
                        type: 'string',
                        direction: -1
                    },
                    action : null,
                },
                {
                    name   : 'departmentPositionName',
                    caption: 'Отдел/должность',
                    sorting: null,
                    action : (slotParams) => {
                        return `<div>${slotParams.item.departmentName}</div><div>${slotParams.item.positionName}</div>`
                    },
                },
                {
                    name   : 'employeeContacts',
                    caption: 'Контакты',
                    sorting: null,
                    action : (slotParams) => {
                        return `<div>${slotParams.item.employeePhone}</div><div>${slotParams.item.employeeEmail}</div>`
                    },
                },
                {
                    name   : 'employeeSalary',
                    caption: 'Месячная оплата',
                    sorting: {
                        type: 'number',
                        direction: -1
                    },
                    action : null
                },
                {
                    name   : 'hireDate',
                    caption: 'Начало работы',
                    sorting: null,
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

    methods: {
        localSortList: utils.sortList
    },

    inject: ['timestampToNumbers'],

    components: {ListCard}
}
</script>