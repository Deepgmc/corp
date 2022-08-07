<template>
    <div class="card mt-2">
        <div class="card-header">
            Наши отделы
        </div>
        <div class="list-group list-group-flush list-font-size">
            <list :items="company.departments">
                <template #itemSlot="slotParams">
                    {{slotParams.item.name}}
                </template>
            </list>
        </div>
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