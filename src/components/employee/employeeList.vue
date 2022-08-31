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
            <tr
                class="listItem__activating"
                @click="loadEmployeeRedactingForm($event, slotParams.item)"
                data-bs-toggle="modal" data-bs-target="#redactEmployeeModal"
            >
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

    <div class="modal fade" id="redactEmployeeModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body" ref="redactComponentContainer">
                    <redact-employee-component
                        :loadingEmployeeId="loadingEmployeeId"
                        :isModal="true"
                    ></redact-employee-component>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ListCard from '@/components/common/ListCard.vue'
import { mapState } from 'vuex'
//import { defineAsyncComponent } from 'vue'
import utils from '@/utils/utilFunctions'
import redactEmployeeComponent from '@/components/employee/addEmployee.vue'



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
            loadingEmployeeId: null,
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
            employees: state => state.company.employees,
            departments: state => state.company.departments,
            positions: state => state.company.positions,
        }),

        localEmployees() {
            if(!this.employees) return []
            return [...this.employees].map(emp => {
                /**
                    нужно из company.departments выцепить имя департамента по id
                    и вставить в список employees
                */
                return {
                    ...emp,
                    departmentName: [...this.departments].find((department) => {
                        return department.id === emp.departmentId
                    }).name,
                    positionName: [...this.positions].find((position) => {
                        return position.id === emp.positionId
                    }).name,
                }
            })
        }
    },

    methods: {
        localSortList: () => {
            this.sorting = utils.sortList()
        },

        loadEmployeeRedactingForm(event, emp){
            //this.loadingEmployee = defineAsyncComponent(() => import('./addEmployee.vue'))
            this.loadingEmployeeId = emp.id
        }
    },

    inject: ['timestampToNumbers'],

    components: {ListCard, redactEmployeeComponent}
}
</script>