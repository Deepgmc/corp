<template>

    <div class="list-group list-group-flush list-font-size">

        <div v-for="(item, index) in itemsToRender" :key="index" class="list-group-item">
            <slot name="itemSlot" :item="item"></slot>
        </div>

        <div v-if="isCollapsed && isNeedShowMore" class="list-group-item showMore" @click="expandItems">
            ...
        </div>
        <div v-else-if="isNeedShowMore" class="list-group-item showMore" @click="deExpandItems">
            свернуть
        </div>

    </div>

</template>

<script>

export default {

    data(){
        return {
            isCollapsed: true,
            itemsToRender: []
        }
    },

    computed: {
        collapsedItems() {
            return [...this.items].splice(0, this.collapsedSizeInt)
        },
        collapsedSizeInt() {
            return parseInt(this.collapsedSize, 10)
        },
        isNeedShowMore(){
            return this.items.length > this.collapsedSizeInt
        }
    },

    props: {
        items: {
            type    : Array,
            required: false,
            default : []
        },
        collapsedSize: {
            type    : String,
            required: true,
            default : '5'
        }
    },

    mounted(){
        this.itemsToRender = this.collapsedItems
    },

    methods: {
        expandItems(){
            this.isCollapsed = false
            this.itemsToRender = this.items
        },
        deExpandItems(){
            this.isCollapsed = true
            this.itemsToRender = this.collapsedItems
        }
    }

}
</script>