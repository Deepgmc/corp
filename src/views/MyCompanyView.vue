<template>
    <div>
        <div class="row mt-2">
            <div class="col-md-12">
                <company-overwiew></company-overwiew>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                Общее число сотрудников, баланс компании, активные/будущие сделки
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <my-company-component></my-company-component>
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import MyCompanyComponent from '@/components/MyCompanyComponent.vue'
import CompanyOverwiew from '@/components/CompanyOverwiew.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MyCompanyView',

    components: {MyCompanyComponent, CompanyOverwiew},
})

</script>