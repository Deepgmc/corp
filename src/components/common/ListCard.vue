<template>
    <div class="card mt-2">

        <div class="card-header card-header__colors">
            {{caption}}
            <input
                type="text"
                class="list__search_input form-control form-control-sm"
                @input="filterByField"
            >
        </div>

        <table class="table">

            <thead class="list-font-size">
                <slot name="listTableCaption"></slot>
            </thead>

            <tbody class="list-font-size">
                <list
                    :items="filteredItems"
                    :collapsedSize="collapsedSize"
                >
                    <template #itemSlot="slotParams">
                        <slot name="listBody" :item="slotParams.item"></slot>
                    </template>
                </list>
            </tbody>

        </table>

    </div>
</template>

<script>
import List from '@/components/common/List.vue'

export default {

    data(){
        return {
            filteredItems: this.items
        }
    },
    props: {
        items: {
            type    : Array,
            required: false,
            default : []
        },
        collapsedSize: {
            type    : Number,
            required: false,
            default : 5
        },
        caption: {
            type    : String,
            required: false,
            default : 5
        },
        filterField: {
            type    : String,
            required: true,
            default : 'name'
        }
    },

    methods: {
        filterByField(event){
            this.filteredItems = this.items.filter(
                item => item[this.filterField].toLowerCase().includes(
                    event.target.value.toLowerCase()
                )
            )
        }
    },

    components: {List},
}
</script>