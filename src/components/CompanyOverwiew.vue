<template>
    <chart-component
        type="pie"
        :chartDataName="chartDataName"
        :chartCaption="chartCaption"
        :data="chartData"
        :fieldX="'department'"
        :fieldY="'empNumber'"
        :chartItemClick="chartItemClick"
    >
        <template #subTableSlot>
            <div v-if="clickedChartItem">
                {{clickedChartItem}}
            </div>
        </template>
    </chart-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { IEmp, IDepartment } from '@/types/StoreTypes'
import { IDepartmentsGraphSummary } from '@/types/globalTypes'
import {
    COMPANY_TREE_TXT,
    COMPANY_STRUCTURE_TXT
} from '@/utils/MESSAGES'
import chartComponent from '@/components/common/chart/ChartComponent.vue'

export default defineComponent({
    data(){
        return {
            chartDataName   : COMPANY_TREE_TXT,
            chartCaption    : COMPANY_STRUCTURE_TXT,
            clickedChartItem: null as null | string,
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
        }
    },

    methods: {
        chartItemClick (clickedItem: IDepartmentsGraphSummary) {
            //динамически подгрузить компонент с таблицей сотрудников
            console.log('clickedItem!', clickedItem)
            this.clickedChartItem = `${clickedItem.department} - ${clickedItem.departmentId} - ${clickedItem.empNumber} чел.`
        }
    },

    components: {chartComponent},
})
</script>