<template>
    <list-card
        :items="company.departments"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="name"
    >
        <template #listBody="slotParams">
            <div class="row">
                <div class="col-md-6">{{slotParams.item.name}}</div>
                <div class="col-md-6">{{getDepartmentSize(company.employees, slotParams.item.id)}} чел.</div>
            </div>
        </template>
    </list-card>
</template>

<script>

import ListCard from '@/components/common/ListCard.vue'
import { mapState } from 'vuex'

export default {

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Наши отделы'
        }
    },

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),
    },

    inject: ['getDepartmentSize'],

    components: {ListCard}

}
</script>