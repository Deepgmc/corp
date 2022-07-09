<template>
    <div>
        Bills layout
        <bills-component></bills-component>
    </div>
</template>


<script>

import BillsComponent from '@/components/BillsComponent.vue'

export default {
    name: 'BillsView',
    components: {BillsComponent},

}
</script>