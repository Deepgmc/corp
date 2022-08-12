<template>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12">
                    <employee-list></employee-list>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card mt-2">
                        <div class="card-header card-header__colors">
                            Динамика за год
                        </div>
                        <div class="card-body">
                            <canvas></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <add-department></add-department>
                </div>
                <div class="col-md-6">
                    <departments-list></departments-list>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <add-employee></add-employee>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import EmployeeList from '@/components/employee/EmployeeList.vue'
import addEmployee from '@/components/employee/addEmployee.vue'
import addDepartment from '@/components/employee/addDepartment.vue'
import departmentsList from '@/components/employee/departmentsList.vue'

export default {
    name: 'EmployeeView',
    components: {EmployeeList, addEmployee, addDepartment, departmentsList},
}
</script>