<template>
    <div v-for="item in items" :key="item.id" class="list-group-item">
        <slot name="itemSlot" :item="item"></slot>
    </div>
</template>

<script>

export default {

    props: {
        items: {
            type    : Array,
            required: false,
            default : []
        }
    },

}
</script>