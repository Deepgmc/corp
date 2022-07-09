<template>
    <div>
        Transactions layout
        <transactions-component></transactions-component>
    </div>
</template>


<script>
import TransactionsComponent from '@/components/TransactionsComponent.vue'
export default {
    name: 'TransactionsView',
    components: {TransactionsComponent},
}
</script>