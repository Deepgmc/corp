<template>
    <div class="card mt-2">

        <div class="card-header">
            Наши отделы
        </div>

        <list
            :items="company.departments"
            collapsedSize="5"
        >
            <template #itemSlot="slotParams">
                <div class="row">
                    <div class="col-md-1">{{slotParams.item.id}}</div>
                    <div class="col-md-11">{{slotParams.item.name}}</div>
                </div>
            </template>
        </list>

    </div>
</template>

<script>

import List from '@/components/common/List.vue'
import { mapState } from 'vuex'

export default {

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),
    },

    components: {List}

}
</script>

<style lang="scss">
.list-font-size{
    font-size: $list-font-size;
}
</style>