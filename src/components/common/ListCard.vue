<template>
    <div class="card mt-2">

        <div class="card-header card-header__colors">
            {{caption}}
            <input
                type="text"
                class="list__search_input form-control form-control-sm"
                @input="filterByField($event.target.value)"
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
            sortedItems     : [],
            filteredItems   : [],
            sortingDirection: 1,
            filterText      : ''
        }
    },

    props: {
        items: {
            type    : Array,
            required: false,
            default : () => []
        },
        collapsedSize: { // размер таблицы в свернутом состоянии
            type    : Number,
            required: false,
            default : 5
        },
        caption: { // заголовок таблицы
            type    : String,
            required: false,
            default : 'default caption'
        },
        filterField: {
            type    : String,
            required: false,
            default : 'name'
        },
        sorting: {
            type    : Object,
            required: false
        },
    },

    mounted(){
        this.sortBasicData(this.sorting)
    },

    methods: {
        filterByField(text){
            if(!text) {
                this.filterText = ''
                this.filteredItems = this.sortedItems
                return
            }
            this.filterText = text
            this.filteredItems = this.sortedItems.filter(
                item => item[this.filterField].toLowerCase().includes(
                    text.toLowerCase()
                )
            )
        },
        sortBasicData(sorting){
            let tmpList = [...this.items]
            tmpList.sort((item1, item2) => {
                const aText = item1[sorting.field]
                const bText = item2[sorting.field]

                if(aText === bText) return 0
                if(aText < bText) return this.sortingDirection * -1
                else return this.sortingDirection
            })
            this.sortedItems = tmpList
            this.filterByField(this.filterText)
        }
    },

    watch: {
        sorting(newSorting/*, oldSorting*/){
            this.sortingDirection = newSorting.direction
            this.sortBasicData(newSorting)
        },
        items(/*newItems*/){
            this.sortBasicData(this.sorting)
        }
    },

    components: {List},
}
</script>