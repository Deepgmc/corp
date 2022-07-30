<template>
    <div>
        <div v-if="isLoading">Данные загружаются с ЦБ РФ...</div>
        <div v-else>

            <div class="card text-center">
                <div class="card-header">
                    Курсы валют
                </div>
                <slot name="currencyBody" :previewCurrencies="previewCurrencies" :currencies="currencies"></slot>
            </div>

        </div>
    </div>
</template>

<script>
/**
<Valute ID="R01370">
    <NumCode>417</NumCode>
    <CharCode>KGS</CharCode>
    <Nominal>100</Nominal>
    <Name>Киргизских сомов</Name>
    <Value>72,4723</Value>
</Valute>
*/


export default {
    /*
        подгружаем инфу по валютам с ЦБ РФ
    */
    name: 'currencyInfo',

    data: () => ({
        whatToPreview: ['TRY', 'USD', 'EUR']
    }),

    props: {
        currencies: Array,
        isLoading : Boolean
    },

    computed: {
        previewCurrencies(){
            return this.currencies.filter(currency => this.whatToPreview.includes(currency.charCode))
        }
    },

}
</script>

<style>

</style>