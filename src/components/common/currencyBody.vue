<template>
    <div class="card-body text-left">
        <div class="card-text" v-for="currency in currencies" :key="currency.numCode">
            <div><strong>{{currency.name}}</strong></div>
            <div>{{currency.nominal}} = {{parseFloat(currency.value).toFixed(1)}} рублей</div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'currencyBody',


    props: {
        currencies: Array
    },

}
</script>

<style>

</style>