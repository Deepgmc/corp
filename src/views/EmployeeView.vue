<template>
    <div class="row">
        <div class="col-md-12 border-bottom">
            <employee-component></employee-component>
        </div>
        <div class="col-md-6">
            <add-department></add-department>
        </div>
        <div class="col-md-6">
            <add-employee></add-employee>
        </div>
    </div>
</template>


<script>
import EmployeeComponent from '@/components/employee/EmployeeComponent.vue'
import addEmployee from '@/components/employee/addEmployee.vue'
import addDepartment from '@/components/employee/addDepartment.vue'

export default {
    name: 'EmployeeView',
    components: {EmployeeComponent, addEmployee, addDepartment},
}
</script>