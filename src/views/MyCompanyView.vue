<template>
    <div>
        <my-company-component></my-company-component>
    </div>
</template>


<script>

import MyCompanyComponent from '@/components/MyCompanyComponent.vue'

export default {
    name: 'MyCompanyView',

    components: {MyCompanyComponent},
}

</script>