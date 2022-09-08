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
                            Динамика отдела кадров
                        </div>
                        <div class="card-body">
                            <!-- <employee-dynamic></employee-dynamic> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import employeeList from '@/components/employee/employeeList.vue'
// import employeeDynamic from '@/components/employee/employeeDynamic.vue'

export default {
    name: 'EmployeeView',

    components: {employeeList, /*employeeDynamic*/},

    // beforeUnmount() {
    //     if (this.chart) {
    //         this.chart.dispose()
    //     }
    // }
}
</script>