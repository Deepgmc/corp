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
                <th v-for="column in columns" :key="column.field" class="text-left">
                    {{column.caption}}
                    <span v-if="column.sorting" @click="localSortList(column)" style="color:green;cursor:pointer;">&#8645;</span>
                </th>
            </tr>
        </template>
        <template #listBody="slotParams">
            <tr>
                <td v-for="column in columns" :key="column.field">
                    <template v-if="column.action">
                        {{column.action(slotParams)}}
                    </template>
                    <template v-else>
                        {{slotParams.item[column.field]}}
                    </template>
                </td>
                <td>
                    <template v-for="button in buttons" :key="button">
                        <button-component
                            :buttonType="button.type"
                            :itemData="slotParams.item"
                            partition="departments"
                        ></button-component>
                    </template>
                </td>
            </tr>
        </template>
    </list-card>
</template>

<script>

import ListCard from '@/components/common/ListCard.vue'
import ButtonComponent from '@/components/common/buttons/ButtonComponent.vue'
import { mapState } from 'vuex'
import utils from '@/utils/utilFunctions'

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
                    field   : 'name',
                    caption: 'Название',
                    sorting: {
                        field    : 'name',
                        type     : 'string',
                        direction: -1
                    },
                    action : null,
                },
                {
                    field   : 'quantity',
                    caption: 'Кол-во сотрудников',
                    sorting: {
                        field    : 'quantity',
                        type     : 'number',
                        direction: -1
                    },
                    action : null
                },
            ],
        }
    },

    buttons: [
        {
            type: 'redact'
        },
        {
            type: 'view'
        },
    ],

    computed: {
        ...mapState('company', {
            company: state => state.company
        }),

        localEmployees(){
            return [...this.company.departments].map(dep => {
                return {
                    ...dep,
                    quantity: utils.getDepartmentSize(this.company.employees, dep.id)
                }
            })
        }
    },

    methods: {
        localSortList(column) {
            column.sorting.direction = column.sorting.direction * -1
            this.sorting = utils.sortList({sorting: column.sorting})
        },
    },

    components: {ListCard, ButtonComponent}

}
</script>