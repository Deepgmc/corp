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
                data-bs-toggle="modal"
                data-bs-target="#redactEmployeeModal"
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
import utils from '@/utils/utilFunctions'
import redactEmployeeComponent from '@/components/employee/addEmployee.vue'
import { employeeListColumns } from '@/components/common/ListCardColumns'

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
                base     : true
            },
            loadingEmployeeId: null,
            columns      : employeeListColumns(utils.timestampToNumbers)
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
                    departmentName: this.getFieldById(this.departments, 'name', emp.departmentId),
                    positionName: this.getFieldById(this.positions, 'name', emp.positionId),
                }
            })
        }
    },

    methods: {
        localSortList (column) {
            if(this.sorting.base){
                this.sorting = utils.sortList(column)
            } else {
                this.sorting = utils.sortList({name: this.sorting.name, sorting: this.sorting})
            }
        },

        loadEmployeeRedactingForm(event, emp){
            //this.loadingEmployee = defineAsyncComponent(() => import('./addEmployee.vue'))
            this.loadingEmployeeId = emp.id
        }
    },

    inject: ['getFieldById'],

    components: {ListCard, redactEmployeeComponent}
}
</script>