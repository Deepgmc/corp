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
                    employee Dynamic here
                    <!-- <employee-dynamic></employee-dynamic> -->
                </div>
            </div>

        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import employeeList from '@/components/employee/employeeList.vue'
//import employeeDynamic from '@/components/employee/employeeDynamic.vue'

export default {
    name: 'EmployeeView',

    components: {employeeList },//employeeDynamic

}
</script>