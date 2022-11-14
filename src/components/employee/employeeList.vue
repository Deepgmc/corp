<template>
    <list-card
        filterField="fio"
        :items="localEmployees"
        :collapsedSize="collapsedSize"
        :caption="caption"
        :sorting="sorting"
    >
        <template #listTableCaption>
            <tr>
                <th v-for="column in columns" :key="column.field" class="text-left">
                    {{column.caption}}
                    <span v-if="column.sorting" @click="localSortList(column)" style="color:green;cursor:pointer;">&#8645;</span>
                </th>
            </tr>
        </template>
        <template #listBody="slotParams">
            <tr
                class="listItem__activating"
            >
                <td v-for="column in columns" :key="column.field">
                    <template v-if="column.action">
                        <span v-html="column.action(slotParams)"></span>
                    </template>
                    <template v-else>
                        <span v-html="slotParams.item[column.field]"></span>
                    </template>
                </td>
                <td>
                    <template v-for="button in slotParams.item.buttons" :key="button">
                        Button type: {{button.type}} {{slotParams.item.id}}
                        <!-- <button-component
                            :buttonType="button.type"
                            :itemData="slotParams.item"
                            partition="employee"
                            @buttonClick="loadEmployeeRedactingForm($event, employeeId)"
                        ></button-component> -->
                    </template>
                </td>
            </tr>
        </template>
    </list-card>

    <div class="modal fade" id="employeeRedactModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body">
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
import utils from '@/utils/utilFunctions'
import redactEmployeeComponent from '@/components/employee/addEmployee.vue'
import { employeeListColumns } from '@/components/common/ListCardColumns'
import ButtonComponent from '@/components/common/buttons/ButtonComponent.vue'

export default {

    name: 'EmployeeList',

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Наши сотрудники',
            sorting      : {
                field    : 'fio',
                type     : 'string',
                direction: 1,
                //base     : true
            },
            loadingEmployeeId: null,
            columns          : employeeListColumns(utils.timestampToNumbers),
        }
    },

    buttons: [
        {
            type: 'redact'
        },
        {
            type: 'view'
        },
        {
            type: 'hire'
        },
    ],

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
                    buttons: this.$options.buttons
                }
            })
        }
    },

    methods: {
        localSortList (column) {
            column.sorting.direction = column.sorting.direction * -1
            this.sorting = utils.sortList({sorting: column.sorting})
        },

        loadEmployeeRedactingForm(employee){
            this.loadingEmployeeId = employee.id
        }
    },

    components: {
        ListCard,
        redactEmployeeComponent,
        //ButtonComponent

    }
}
</script>