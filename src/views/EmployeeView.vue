<template>
    <div>
        Employee layout
        <employee-component></employee-component>
    </div>
</template>


<script>
import EmployeeComponent from '@/components/EmployeeComponent.vue'
export default {
    name: 'EmployeeView',
    components: {EmployeeComponent},
}
</script>