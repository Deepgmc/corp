<template>
    <div class="card mt-2">

        <div class="card-header card-header__colors">
            Наши отделы
        </div>

        <list
            :items="company.departments"
            :collapsedSize="collapsedSize"
        >
            <template #itemSlot="slotParams">
                <div class="row">
                    <!-- <div class="col-md-1">{{slotParams.index + 1}}</div> -->
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

    data(){
        return {
            collapsedSize: 5
        }
    },

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),
    },

    components: {List}

}
</script>