<template>
    <div class="row">
        <div class="col-md-12">
            <departments-list></departments-list>

        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <add-department></add-department>
        </div>
        <div class="col-md-6">
            <add-position></add-position>
        </div>
    </div>
</template>

<script>
import addDepartment from '@/components/employee/addDepartment.vue'
import addPosition from '@/components/employee/addPosition.vue'
import departmentsList from '@/components/employee/departmentsList.vue'
export default {
    components: {addDepartment, departmentsList, addPosition}
}
</script>