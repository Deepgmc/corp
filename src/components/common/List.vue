<template>

    <div class="list-group">

        <div v-if="itemsToRender.length < 1">
            <div class="p-3">Данных для отображения нет</div>
        </div>

        <div v-else class="list-font-size">


            <div v-for="(item, index) in itemsToRender" :key="index" class="list-group-item">
                <slot name="itemSlot" :item="item" :index="index"></slot>
            </div>


            <div v-if="isCollapsed && isNeedShowMore" class="list-group-item showMore" @click="expandItems">
                ...
            </div>
            <div v-else-if="isNeedShowMore" class="list-group-item showMore" @click="expandItems">
                свернуть
            </div>


        </div>

    </div>

</template>

<script>

export default {

    data(){
        return {
            isCollapsed: true,
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
        },
        itemsToRender() {
            if(this.isCollapsed) {
                return this.collapsedItems
            } else if(!this.isCollapsed){
                return this.items
            }
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
            required: true,
            default : 5
        }
    },

    methods: {
        expandItems(){
            this.isCollapsed = !this.isCollapsed
        },
    }

}
</script>