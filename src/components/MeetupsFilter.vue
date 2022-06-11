<template>
    <div>
        <input type="text" placeholder="filter" v-model="filter" @input="onFiltration" />
    </div>
</template>
<script>
export default {
    props: {
        onFiltration: {
            type: Function,
            required: true
        },
        filter: {
            type: String
        }
    },
}
</script>