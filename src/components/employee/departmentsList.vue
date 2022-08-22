<template>
    <list-card
        :items="company.departments"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="name"
    >
        <template #listTableCaption>
            <tr>
                <th v-for="column in columns" :key="column.name" class="text-left">{{column.caption}}</th>
            </tr>
        </template>
        <template #listBody="slotParams">
            <tr>
                <td v-for="column in columns" :key="column.name">
                    <template v-if="column.action">
                        {{column.action(slotParams)}}
                    </template>
                    <template v-else>
                        {{slotParams.item[column.name]}}
                    </template>
                </td>
            </tr>
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
            caption      : 'Департаменты компании',
            columns      : [
                {
                    name   : 'name',
                    action : null,
                    caption: 'Название',
                },
                {
                    name   : 'quantity',
                    action: (slotParams) => {
                        return this.getDepartmentSize(this.company.employees, slotParams.item.id) + ' чел.'
                    },
                    caption: 'Кол-во сотрудников',
                },
            ]
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