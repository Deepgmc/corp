<template>
    <div>
        <my-company-component></my-company-component>
    </div>
</template>


<script lang="ts">

import MyCompanyComponent from '@/components/MyCompanyComponent.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MyCompanyView',

    components: {MyCompanyComponent},
})

</script>