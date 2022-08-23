<template>
    <list-card
        :items="localEmployees"
        :collapsedSize="collapsedSize"
        :caption="caption"
        filterField="name"
        :sorting="sorting"
    >
        <template #listTableCaption>
            <tr>
                <th v-for="column in columns" :key="column.name" class="text-left">
                    {{column.caption}}
                    <span v-if="column.sorting" @click="localSortList(column)" style="color:green;cursor:pointer;">&#8645;</span>
                </th>
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
import utils from '@/utils/utilFunctions.js'

export default {

    data(){
        return {
            collapsedSize: 5,
            caption      : 'Департаменты компании',
            sorting      : {
                field    : 'name',
                type     : 'string',
                direction: 1
            },
            columns: [
                {
                    name   : 'name',
                    caption: 'Название',
                    sorting: {
                        type     : 'string',
                        direction: -1
                    },
                    action : null,
                },
                {
                    name   : 'quantity',
                    caption: 'Кол-во сотрудников',
                    sorting: {
                        type     : 'number',
                        direction: -1
                    },
                    action : null
                },
            ]
        }
    },

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),

        localEmployees(){
            return [...this.company.departments].map(dep => {
                return {
                    ...dep,
                    quantity: this.getDepartmentSize(this.company.employees, dep.id) + ' чел.'
                }
            })
        }
    },

    methods: {
        localSortList: utils.sortList,
    },

    inject: ['getDepartmentSize'],

    components: {ListCard}

}
</script>