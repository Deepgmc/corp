<template>
    <chart-component
        type="pie"
        :chartDataName="chartDataName"
        :chartCaption="chartCaption"
        :data="chartData"
        :fieldX="'department'"
        :fieldY="'empNumber'"
        :chartItemClick="chartItemClick"
        :clickFirstItem="clickFirstItem"
    >
        <template #subTableSlot>
            <div v-if="clickedChartDepartmentId">

                <list-card
                    :items="selectedEmployees"
                    :collapsedSize="collapsedSize"
                    :caption="tableCaption"
                    :sorting="sorting"
                    :isSearchField="false"
                >
                    <template #listTableCaption>
                        <tr>
                            <th v-for="column in columns" :key="column.name" class="text-left">
                                {{column.caption}}
                            </th>
                        </tr>
                    </template>
                    <template #listBody="slotParams">
                        <tr
                            class="listItem__activating"
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

            </div>
        </template>
    </chart-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { IEmp, IDepartment, IPosition } from '@/types/StoreTypes'
import { IDepartmentsGraphSummary, IEmpListItem } from '@/types/globalTypes'
import {
    COMPANY_TREE_TXT,
    COMPANY_STRUCTURE_TXT
} from '@/utils/MESSAGES'
import chartComponent from '@/components/common/chart/ChartComponent.vue'
import ListCard from '@/components/common/ListCard.vue'
import { employeeListColumns } from '@/components/common/ListCardColumns'
import utils from '@/utils/utilFunctions'

export default defineComponent({
    data(){
        return {
            collapsedSize           : 5,
            tableCaption            : '',
            chartDataName           : COMPANY_TREE_TXT,
            chartCaption            : COMPANY_STRUCTURE_TXT,
            clickedChartDepartmentId: null as null | number,
            columns                 : employeeListColumns(utils.timestampToNumbers),
            sorting      : {
                field    : 'fio',
                type     : 'string',
                direction: 1
            },
        }
    },

    computed: {
        ...mapState({
            employees: (state: any): Array<IEmp> => {
                return state.company.company.employees
            },

            departments: (state: any): Array<IDepartment> => {
                return state.company.company.departments
            },

            positions: (state: any): Array<IPosition> => {
                return state.company.company.positions
            },

        }),

        chartData(): Array<IDepartmentsGraphSummary> {
            /**
             * собираем данные для графика: департаменты <-> количество сотрудников
             */
            const empViaDep = this.departments.map((dep: IDepartment) => {
                return {
                    departmentId: dep.id,
                    department: dep.name,
                    empNumber: this.employees.reduce((acc: number, emp: IEmp) => {
                        if(emp.departmentId === dep.id) acc++
                        return acc
                    }, 0),
                }
            })
            return empViaDep
        },

        selectedEmployees(): Array<IEmpListItem> {
            if(!this.employees) return []

            const foundEmp = this.employees
                .filter(emp => {
                    return emp.departmentId === this.clickedChartDepartmentId
                })
                .map(emp => {
                    const departmentName = [...this.departments].find((department: IDepartment) => {
                                            return department.id === emp.departmentId
                                        })
                    const positionName = [...this.positions].find((position: IDepartment) => {
                                            return position.id === emp.positionId
                                        })
                    return {
                        ...emp,
                        departmentName: departmentName ? departmentName.name: '',
                        positionName  : positionName ? positionName.name    : ''
                    }
                })
            return foundEmp
        }
    },

    methods: {
        chartItemClick (clickedItem: IDepartmentsGraphSummary) {
            //динамически подгрузить компонент с таблицей сотрудников
            this.tableCaption = `${clickedItem.department} (${clickedItem.empNumber} чел.)`
            this.clickedChartDepartmentId = clickedItem.departmentId
        },

        /**после загрузки чарта делаем нажатым 1й попавшийся слайс департамента */
        clickFirstItem(){
            if(this.departments.length < 1) return
            const department = utils.getDepartmentById(this.departments, this.departments[0].id)

            this.chartItemClick({
                department: department ? department.name : '',
                empNumber: utils.getDepartmentSize(this.employees, this.departments[0].id),
                departmentId: this.departments[0].id
            })
        },

    },

    components: {chartComponent, ListCard},
})
</script>