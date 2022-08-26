<template>
    <div class="row">
        <div class="col-md-12">
            <add-employee></add-employee>
        </div>
    </div>
</template>

<script>
import addEmployee from '@/components/employee/addEmployee.vue'
export default {

    name: 'AddEmployeeView',

    components: {addEmployee},
}
</script>