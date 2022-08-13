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
    </div>
</template>

<script>
import addDepartment from '@/components/employee/addDepartment.vue'
import departmentsList from '@/components/employee/departmentsList.vue'
export default {
    components: {addDepartment, departmentsList}
}
</script>