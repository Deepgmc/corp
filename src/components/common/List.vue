<template>


        <div v-if="itemsToRender.length < 1">
            <div class="p-3">Данных для отображения нет</div>
        </div>

        <template v-else>

            <template v-for="(item, index) in itemsToRender" :key="index">
                <slot name="itemSlot" :item="item" :index="index"></slot>
            </template>


            <tr v-if="isCollapsed && isNeedShowMore" class="text-left showMore" @click="expandItems">
                <td colspan=20>
                    ...
                </td>
            </tr>
            <tr v-else-if="isNeedShowMore" class="text-left showMore" @click="expandItems">
                <td colspan=20>
                    свернуть
                </td>
            </tr>

        </template>

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