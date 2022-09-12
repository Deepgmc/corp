<template>
    <chart-component
        type="xy"
        :chartDataName="chartDataName"
        :chartCaption="chartCaption"
        :data="chartData"
        :fieldX="'date'"
        :fieldY="'value'"
    >
    </chart-component>
</template>

<script>

import { mapState } from 'vuex'
import chartComponent from '@/components/common/chart/ChartComponent.vue'
import {
    NEW_EMPLOYEE_TXT,
    EMPLOYEE_DYNAMIC_TXT
} from '@/utils/MESSAGES'

export default {
    data(){
        return {
            chartDataName: NEW_EMPLOYEE_TXT,
            chartCaption : EMPLOYEE_DYNAMIC_TXT,
        }
    },

    computed: {
        ...mapState('company', {
            employees: state => state.company.employees
        }),

        chartData(){
            const employeeQuantity = new Map()
            const finalData = [];
            [...this.employees].sort((emp1, emp2) => {
                if(emp1.hireDate === emp2.hireDate) return 0
                if(emp1.hireDate < emp2.hireDate) return -1
                else return 1
            })
            .forEach((emp) => {
                const thisEmpDate = new Date(this.timestampToNumbers(emp.hireDate, 'en'))
                employeeQuantity.set(emp.hireDate, {
                    date : thisEmpDate,
                    value: typeof employeeQuantity.get(emp.hireDate) === 'undefined' ? 1: employeeQuantity.get(emp.hireDate).value + 1
                })
            })
            employeeQuantity.forEach(eq => {
                finalData.push(eq)
            })
            return finalData
        }
    },

    components: {chartComponent},

    inject: ['timestampToNumbers'],
}
</script>