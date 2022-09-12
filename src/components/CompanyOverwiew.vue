<template>
    <chart-component
        type="pie"
        :chartDataName="chartDataName"
        :chartCaption="chartCaption"
        :data="chartData"
        :fieldX="'department'"
        :fieldY="'empNumber'"
    >
    </chart-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import chartComponent from '@/components/common/chart/ChartComponent.vue'
import { IEmp, IDepartment } from '@/types/StoreTypes'
import { IDepartmentsSummary } from '@/types/globalTypes'
import {
    COMPANY_TREE_TXT,
    COMPANY_STRUCTURE_TXT
} from '@/utils/MESSAGES'

export default defineComponent({
    data(){
        return {
            chartDataName: COMPANY_TREE_TXT,
            chartCaption: COMPANY_STRUCTURE_TXT,
        }
    },

    computed: {
        ...mapState({
            employees: (state: any) => {
                return state.company.company.employees
            },
            departments: (state: any) => {
                return state.company.company.departments
            },
        }),

        chartData(): Array<IDepartmentsSummary>{
            const empViaDep = this.departments.map((dep: IDepartment) => {
                return {
                    department: dep.name,
                    empNumber: this.employees.reduce((acc: number, emp: IEmp) => {
                        if(emp.departmentId === dep.id) acc++
                        return acc
                    }, 0)
                }
            })
            return empViaDep
        }
    },

    components: {chartComponent},
})
</script>